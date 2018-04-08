class PlatformSh {
  constructor() {
    const envVars = Object.keys(process.env);
    if (
      envVars.find(envVar => {
        return envVar.match(/PLATFORM\.*/);
      })
    ) {
      this._application = this.getVar("PLATFORM_APPLICATION", true);
      this._relationships = this.getVar("PLATFORM_RELATIONSHIPS", true);
      this._variables = this.getVar("PLATFORM_VARIABLES", true);
      this._routes = this.getVar("PLATFORM_ROUTES", true);
      this._application_name = this.getVar("PLATFORM_APPLICATION_NAME");
      this._app_dir = this.getVar("PLATFORM_APP_DIR");
      this._environment = this.getVar("PLATFORM_ENVIRONMENT");
      this._project = this.getVar("PLATFORM_PROJECT");
      this._tree_id = this.getVar("PLATFORM_TREE_ID");
      this._project_entropy = this.getVar("PLATFORM_PROJECT_ENTROPY");
      this._branch = this.getVar("PLATFORM_BRANCH");
      this._document_root = this.getVar("PLATFORM_DOCUMENT_ROOT");
      this._port = this.getVar("PORT");
      this._omp_num_threads = this.numberOfCpus();
      this._psh = true;
    }
  }

  numberOfCpus = () => {
    try {
      if (process.env["OMP_NUM_THREADS"]) {
        return process.env["OMP_NUM_THREADS"];
      } else {
        return Math.ceil(require("/run/config.json").info.limits.cpu);
      }
    } catch (err) {
      // Mocking data in dev mode.
      return 1;
    }
  };

  getVar(name, base64 = false) {
    try {
      return base64
        ? JSON.parse(Buffer.from(process.env[name], "base64").toString())
        : process.env[name];
    } catch (e) {
      return "{}";
    }
  }

  getApplication() {
    return this._application;
  }

  getApplicationName() {
    return this._application_name;
  }

  getApplicationDir() {
    return this._app_dir;
  }

  getApplicationRoutes(appId) {
    return (
      Object.entries(this._routes).find(([url, appInfo]) => {
        return appInfo.upstream === appId;
      }) || []
    );
  }

  getBranch() {
    return this._branch;
  }

  getDocumentRoot() {
    return this._document_root;
  }

  getEnvironment() {
    return this._environment;
  }

  getOmpNumThreads() {
    return this._omp_num_threads;
  }

  getPort() {
    return this._port;
  }

  getProject() {
    return this._project;
  }

  getProjectEntropy() {
    return this._project_entropy;
  }

  getRelationships() {
    return this._relationships;
  }

  getRoutes() {
    return this._routes;
  }

  getTreeId() {
    return this._tree_id;
  }

  getVariables() {
    return this._variables;
  }

  isOnPlatform() {
    return this._psh;
  }
}

export default new PlatformSh();
