"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, PodInfoCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export("PodInfoCtrl", PodInfoCtrl = function () {
        /** @ngInject */
        function PodInfoCtrl($scope, $injector, backendSrv, datasourceSrv, $q, $location, alertSrv) {
          var _this = this;

          _classCallCheck(this, PodInfoCtrl);

          this.$q = $q;
          this.backendSrv = backendSrv;
          this.datasourceSrv = datasourceSrv;
          this.$location = $location;

          this.pageReady = false;
          this.pod = {};
          if (!("cluster" in $location.search() && "namespace" in $location.search())) {
            alertSrv.set("no cluster or namespace specified.", "no cluster or namespace specified in url", 'error');
            return;
          } else {
            (function () {
              _this.cluster_id = $location.search().cluster;
              _this.namespace = $location.search().namespace;
              var pod_name = $location.search().pod;

              _this.loadDatasource(_this.cluster_id).then(function () {
                _this.clusterDS.getPod(_this.namespace, pod_name).then(function (pod) {
                  _this.pod = pod;
                  _this.pageReady = true;
                });
              });
            })();
          }
        }

        _createClass(PodInfoCtrl, [{
          key: "loadDatasource",
          value: function loadDatasource(id) {
            var _this2 = this;

            return this.backendSrv.get('api/datasources/' + id).then(function (ds) {
              return _this2.datasourceSrv.get(ds.name);
            }).then(function (clusterDS) {
              _this2.clusterDS = clusterDS;
              return clusterDS;
            });
          }
        }, {
          key: "conditionStatus",
          value: function conditionStatus(condition) {
            var status;
            if (condition.type === "Ready") {
              status = condition.status === "True";
            } else {
              status = condition.status === "False";
            }

            return {
              value: status,
              text: status ? "Ok" : "Error"
            };
          }
        }, {
          key: "isConditionOk",
          value: function isConditionOk(condition) {
            return this.conditionStatus(condition).value;
          }
        }]);

        return PodInfoCtrl;
      }());

      _export("PodInfoCtrl", PodInfoCtrl);

      PodInfoCtrl.templateUrl = 'components/clusters/partials/pod_info.html';
    }
  };
});
//# sourceMappingURL=podInfo.js.map
