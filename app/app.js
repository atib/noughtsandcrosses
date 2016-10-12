var noughtsandcrosses = angular.module("nNc", []);

noughtsandcrosses.controller('noughtsCrossesCtrl', ['$scope','$timeout', function($scope,$timeout){
	
	$scope.scores = [0,0];

	var Board = function() {
		this.rows = [[0,0,0],[0,0,0],[0,0,0]];
		
		this.position = function(coords) {
			return this.rows[coords[0]][coords[1]];
		}


		this.check = function(row, col){
			if (this.rows[row][col] === 0){
				console.log(this.rows[row][col]);
				this.rows[row][col] = $scope.currentPlayer;		
				if (this.checkGameEnd()){
					if (this.win === undefined) {
							this.checkGameEnd() && $scope.checkEndGame();
					}

					$timeout(function(){
						document.getElementById("starting_next").style['display'] = 'block';
					}, 500)			

					$scope.message = this.win === 0 ? "The game is a draw" : "Player " + this.win + " wins";

					if (this.win === 0) {
						$scope.scores[0] += 0.5;
						$scope.scores[1] += 0.5;
					}

					$timeout(function(){
						document.getElementById("starting_next").style['display'] = 'none';
						$scope.message = "Player " + $scope.currentPlayer + " turn";
						$scope.board = new Board();


					}, 3500)

				} else {
					$scope.currentPlayer = $scope.currentPlayer%2 +1;
					$scope.message = "Player " + $scope.currentPlayer + " turn";

				}
			}
		}

		this.checkGameEnd = function () {
			var winningMoves = [
				[[0,0],[1,0],[2,0]],
				[[0,1],[1,1],[2,1]],
				[[0,2],[1,2],[2,2]],
				[[0,0],[0,1],[0,2]],
				[[1,0],[1,1],[1,2]],
				[[2,0],[2,1],[2,2]],
				[[0,0],[1,1],[2,2]],
				[[0,2],[1,1],[2,0]]
			];

			var moves, m, row, col;

			for (m=0; moves = winningMoves[m]; m++){
				
				// console.log(winningMoves[m], m);

				if (this.position(moves[0]) > 0 && this.position(moves[0]) === this.position(moves[1]) 
																				&& this.position(moves[0]) === this.position(moves[2])){

					this.win = this.position(moves[0]); 
					this.winningMove = m+1;
          $scope.scores[this.win - 1]++;
					return true;
				}
			}

			for (row = 0; row < 3; row++){
				console.log('row',row);
				for (col=0; col <3; col++){
					console.log('col',col);
					if (this.position([row,col]) === 0 ) {
						return false;
					}
				}
			}

			this.win = 0;
			return true;
		}


	}

	$scope.checkEndGame = function(){
      $scope.message = ($scope.win > 0 ? "Player "+$scope.win+" wins !" : "Draw game!");
  };

	$scope.init = function(){
    document.getElementById("starting_next").style['display'] = 'none';			

		$timeout(function(){
      document.getElementById("loading").style['display'] = 'none';			
		},4000);

    $scope.win = undefined;
    $scope.currentPlayer = ($scope.currentPlayer||2) % 2 + 1;
		$scope.board = new Board();
		$scope.message = "Player " + $scope.currentPlayer + " starts!";
	}

	$scope.init();
}]);