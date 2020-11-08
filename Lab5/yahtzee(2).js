// JavaScript source code
window.onload = yahtzeeGame;

function yahtzeeGame()
{
	var upperSecAccumulator = 0;
	var yahtzeeScore = 50;
	var totalElm = getElm("totalScore");
	var match;
	var tempMatch;
	var numRolls = 0;
	var held = [false, false, false, false, false];
	var dice = [getElm("0"), getElm("1"), getElm("2"), getElm("3"), getElm("4")];

	function getElm(id)
	{
		return document.getElementById(id);
	};

	function parseInnerHTML()
	{ 
		if (this.innerHTML === "-") return 0;
		else return Number(this.innerHTML);
	};

	function total(value)
	{
		totalElm.innerHTML = Number(totalElm.innerHTML) + value;
	};

	function updateHeld(id)
	{
		for (var j = 0; j < 5; j++)
		{
			held[j] = getElm("hold" + j).checked;
		}
	};

	function roll()
	{
		if (numRolls < 3)
		{
			for (var i = 0; i < 5; i++)
			{
				if (held[i] === false || numRolls === 0)
				{
					dice[i].innerHTML = Math.floor(Math.random() * 6) + 1;
				}
			}
			numRolls++;
		}
	};

	function rollReset()
	{
		numRolls = 0;
		for (var j = 0; j < 5; j++)
		{ 
			dice[j].innerHTML = 0;
		}
	};

	function disable(name)
	{
		var elm = getElm(name);
		elm.classList.add("strike");
		elm.classList.remove("cell");
		elm.onclick = undefined;
	};

	for (var j = 0; j < 5; j++)
	{
		getElm("hold" + j).onclick = updateHeld;
	}

	function cellScore(name, value)
	{
		getElm(name + "Score").innerHTML = value;
		rollReset();
		disable(name);
		total(value);
	};

	function sumDice()
	{
		var count = 0;
		for (var i = 0; i < 5; i++)
		{
			count = count + Number(dice[i].innerHTML);
		}

		return count;
	};

	getElm("roll").onclick = roll;

	function upperSecScore(value)
	{ 
		var count = 0;

		for (var j = 0; j < 5; j++)
		{
			if (Number(dice[j].innerHTML) === value)
			{
				count = count + value;
			}
		}
		return count;
	};

	function upperSec(name, value)
	{
		function func1()
		{
			if (numRolls > 0) 
			{
				var upperScore = upperSecScore(value)
				upperSecAccumulator = upperSecAccumulator + upperScore;
				cellScore(name, upperScore);
				checkUpperBonus();
			}
		};
		return func1;
	};

	getElm("ones").onclick = upperSec("ones", 1);
	getElm("twos").onclick = upperSec("twos", 2);
	getElm("threes").onclick = upperSec("threes", 3);
	getElm("fours").onclick = upperSec("fours", 4);
	getElm("fives").onclick = upperSec("fives", 5);
	getElm("sixes").onclick = upperSec("sixes", 6);

	function kindScore(value, kindVal)
	{
		var numbersOfAKind = 0;

		for (var j = 0; j < 5; j++)
		{
			if (Number(dice[j].innerHTML) === value)
			{
				numbersOfAKind = numbersOfAKind + 1;
			}
		}

		if (numbersOfAKind >= kindVal)
		{
			return sumDice();
		}
		else
		{
			return undefined;
		}
	};

	function kind(kindVal)
	{
		function func2()
		{
			var score = 0;
			for (var j = 1; j < 7; j++)
			{
				score = kindScore(j, kindVal)

				if (score)
				{
					if (kindVal === 3)
					{
						cellScore("threeOfAKind", score);
					}
					else
					{
						cellScore("fourOfAKind", score);
					}
				}
			}
		};

		return func2;
	};

	getElm("threeOfAKind").onclick = kind(3);
	getElm("fourOfAKind").onclick = kind(4);

	function fullHouse()
	{
		var threeOfAKindFound = 0;
		var twoOfAKindFound = 0;

		for (var j = 1; j < 7; j++)
		{
			if (kindScore(j, 3))
			{
				threeOfAKindFound = j;
			}
		}

		for (var j = 1; j < 7; j++)
		{
			if (threeOfAKindFound !== i && kindScore(j, 2))
			{
				twoOfAKindFound = j;
			}
		}

		if (threeOfAKindFound && twoOfAKindFound)
		{
			cellScore("fullHouse", 25);
		}
	};

	getElm("fullHouse").onclick = fullHouse; 

	function searchDice(val)
	{
		var foundDice = false;
		for (var j = 0; j < 5; j++)
		{
			if (Number(dice[j].innerHTML) === val)
			{
				foundDice = true;
			}
		}
		return foundDice;
	};

	function checkStraightCombo(search)
	{
		if (search[4] === undefined)
		{
			if (searchDice(search[0]) && searchDice(search[1]) && searchDice(search[2]) && searchDice(search[3])) return true;

		}
		else
		{ 
			if (searchDice(search[0]) && searchDice(search[1]) && searchDice(search[2]) && searchDice(search[3]) && searchDice(search[4])) return true;
		}
	};

	function straight(smallOrLarge)
	{
		function func3()
		{
			if (smallOrLarge)
			{
				if (checkStraightCombo([1, 2, 3, 4, undefined]) || checkStraightCombo([2, 3, 4, 5, undefined]) || checkStraightCombo([3, 4, 5, 6, undefined])) cellScore("smallStraight", 30);
			}
			else
			{ 
				if (checkStraightCombo([1, 2, 3, 4, 5]) || checkStraightCombo([2, 3, 4, 5, 6])) cellScore("largeStraight", 40);
			}
		};

		return func3;
	};

	getElm("smallStraight").onclick = straight(true);
	getElm("largeStraight").onclick = straight(false);

	function chance()
	{
		if (numRolls > 0) cellScore("chance", sumDice());
	};

	getElm("chance").onclick = chance;

	function yahtzee()
	{
		if (numRolls > 0)
		{
			for (var j = 1, tempMatch = undefined, match = undefined; j < 7; j++)
			{
				tempMatch = kindScore(j, 5);
				if (tempMatch !== undefined) match = true;
			}

			if (match)
			{
				cellScore("yahtzee", yahtzeeScore);
				yahtzeeScore = 100;
				yahtzeeExtend();
			}
		}
	};

	getElm("yahtzee").onclick = yahtzee;

	function checkUpperBonus()
	{
		if (upperSecAccumulator > 62) cellScore("upperSecBonus", 35);
	};

	function yahtzeeExtend()
	{
		getElm("yahtzee").removeAttribute("id");
		getElm("yahtzeeScore").removeAttribute("id");

		
		var newYahtzeeRow = document.createElement("tr");
		var newYahtzeeData1 = document.createElement("td");
		var newYahtzeeData2 = document.createElement("td");

		newYahtzeeData1.innerHTML = "Yahtzee";
		newYahtzeeData2.innerHTML = "-";
		newYahtzeeData1.setAttribute("id", "yahtzee");
		newYahtzeeData1.setAttribute("class", "cell");
		newYahtzeeData1.onclick = yahtzee;
		newYahtzeeData2.setAttribute("id", "yahtzeeScore");

		newYahtzeeRow.appendChild(newYahtzeeData1);
		newYahtzeeRow.appendChild(newYahtzeeData2);
		getElm("yahtzeeTable").appendChild(newYahtzeeRow);
	};
};