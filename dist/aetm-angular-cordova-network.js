(function () {
    'use strict';

    /**
     * This plugin is EXTREMLY inspired by the implementation of $cordovaNetwork in ngCordova.
     *
     * @see https://github.com/driftyco/ng-cordova/blob/master/src/plugins/network.js
     *
     * Dependencies :
     * - https://github.com/apache/cordova-plugin-network-information
     */
    angular
        .module('aetm-network', [])
        .factory('aetmNetworkService', ['$rootScope', '$timeout', function ($rootScope, $timeout) {

            /**
             * Fires offline a event
             */
            var offlineEvent = function () {
                var state = navigator.connection.type;

                $timeout(function () {
                    $rootScope.$broadcast('aetm-network:offline', state);
                });
            };

            /**
             * Fires online a event
             */
            var onlineEvent = function () {
                var state = navigator.connection.type;

                $timeout(function () {
                    $rootScope.$broadcast('aetm-network:online', state);
                });
            };

            document.addEventListener('deviceready', function () {
                if (!navigator.connection) {
                    return;
                }

                document.addEventListener('offline', offlineEvent, false);
                document.addEventListener('online', onlineEvent, false);
            });

            return {
                /**
                 * @return Boolean
                 */
                isOnline: function () {
                    var state = navigator.connection.type;

                    return state !== Connection.UNKNOWN && state !== Connection.NONE;
                },

                /**
                 * @return Boolean
                 */
                isOffline: function () {
                    var state = navigator.connection.type;

                    return state === Connection.UNKNOWN || state === Connection.NONE;
                },

                /**
                 * Return the connection type as string or undefined.
                 *
                 * @return String|undefined
                 */
                getConnectionType: function () {
                    var states = {};

                    states[Connection.ETHERNET] = 'ETHERNET';
                    states[Connection.WIFI] = 'WIFI';
                    states[Connection.CELL_2G] = 'CELL_2G';
                    states[Connection.CELL_3G] = 'CELL_3G';
                    states[Connection.CELL_4G] = 'CELL_4G';
                    states[Connection.CELL] = 'CELL';

                    states[Connection.UNKNOWN] = undefined;
                    states[Connection.NONE] = undefined;

                    return states[navigator.connection.type];
                },

                /**
                 * Return the connection type.
                 * @return String
                 */
                getRawConnectionType: function () {
                    return navigator.connection.type;
                }
            };
        }])
        .run(['$injector', function ($injector) {
            $injector.get('aetmNetworkService'); //ensure the factory always gets initialised
        }]);
})();