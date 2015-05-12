var app = angular.module('NRECalc', []);

app.controller('NRECalcCtrl', ['$scope', '$parse',
  function($scope, $parse) {
    $scope.frm = {};
    
    // http://stackoverflow.com/questions/18380951/how-do-i-set-default-value-of-select-box-in-angularjs
    $scope.curCodes = ['USD','EUR','GBP','CHF','AUD'];
    $scope.selectCUR = 'USD';

    $scope.frm = {
      curAmount: 1000,
      timeMonths: 120,
      inputXchange: 60,
      outputXchange: 62,
      nro_apr: 8.25,
      nre_apr: 8.00,
      fcr_apr: 3.25,
      nro_int: 15,
      nre_int: 0,
      fcr_int: 0
    };
 
    $scope.getValues = function(accType) {
      var APR, tax, netAPR, curAmount, inputXchange, outputXchange, timeYear, curCode;
      var finalAmountINR, finalAmountCUR, finalProfitCUR, finalAmountOWN;
      curAmount = $scope.frm.curAmount;
      inputXchange = $scope.frm.inputXchange;
      outputXchange = $scope.frm.outputXchange;
      timeYear = $scope.frm.timeMonths / 12;
      APR = $parse('frm.' + accType + '_apr')($scope);
      tax = APR * $parse('frm.' + accType + '_int')($scope) / 100;
      netAPR = APR - tax;
      var compFactor = Math.pow(1 + netAPR / 100, timeYear);
      finalAmountINR = Math.round(curAmount * inputXchange * compFactor);
      finalAmountOWN = Math.round(curAmount * compFactor);
      finalAmountCUR = Math.round(finalAmountINR / outputXchange);
      finalProfitCUR = Math.round(finalAmountCUR - curAmount);
      finalProfitOWN = Math.round(finalAmountOWN - curAmount);
      return {
        finalAmountINR: finalAmountINR,
        finalAmountCUR: finalAmountCUR,
        finalAmountOWN: finalAmountOWN,
        finalProfitOWN: finalProfitOWN,
        finalProfitCUR: finalProfitCUR
      };
    };

  }
]);
