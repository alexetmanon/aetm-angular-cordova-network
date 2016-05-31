(function () {
    'use strict';

    /**
     * @see https://github.com/driftyco/ng-cordova/blob/master/src/plugins/network.js
     */
    angular
        .module('aetm-network', [])
        .factory('aetmNetworkService', [function () {
            return {
                /**
                 * @return Boolean|undefined
                 */
                isOnline: function () {
                    if (navigator.connection.type === Connection.UNKNOWN) {
                        return undefined;
                    }

                    return navigator.connection.type !== Connection.NONE;
                },

                /**
                 * Return the connection type as string or undefined.
                 *
                 * @return String|undefined
                 */
                getConnectionType: function () {
                    var states = {};

                    states[Connection.UNKNOWN] = 'UNKNOWN';
                    states[Connection.ETHERNET] = 'ETHERNET';
                    states[Connection.WIFI] = 'WIFI';
                    states[Connection.CELL_2G] = 'CELL_2G';
                    states[Connection.CELL_3G] = 'CELL_3G';
                    states[Connection.CELL_4G] = 'CELL_4G';
                    states[Connection.CELL] = 'CELL';
                    states[Connection.NONE] = undefined;

                    return states[navigator.connection.type];
                }
            };
        }]);
})();