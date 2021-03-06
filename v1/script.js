/*
1. I don’t feel particularly pleased with the way I am. (R) _____
2. I am intensely interested in other people. _____
3. I feel that life is very rewarding. _____
4. I have very warm feelings towards almost everyone. _____
5. I rarely wake up feeling rested. (R) _____
6. I am not particularly optimistic about the future. (R) _____
7. I find most things amusing. _____
8. I am always committed and involved. _____
9. Life is good. _____
10. I do not think that the world is a good place. (R) _____
11. I laugh a lot. _____
12. I am well satisfied about everything in my life. _____
13. I don’t think I look attractive. (R) _____
14. There is a gap between what I would like to do and what I have done. (R) _____
15. I am very happy. _____
16. I find beauty in some things. _____
17. I always have a cheerful effect on others. _____
18. I can fit in (find time for) everything I want to. _____
19. I feel that I am not especially in control of my life. (R) _____
20. I feel able to take anything on. _____
21. I feel fully mentally alert. _____
22. I often experience joy and elation. _____
23. I don’t find it easy to make decisions. (R) _____
24. I don’t have a particular sense of meaning and purpose in my life. (R) _____
25. I feel I have a great deal of energy. _____
26. I usually have a good influence on events. _____
27. I don’t have fun with other people. (R) _____
28. I don’t feel particularly healthy. (R) _____
29. I don’t have particularly happy memories of the past. (R) _____
*/

let test = {
    testItems: [
        { q: "I don’t feel particularly pleased with the way I am.", weight: -1 },
        { q: "I am intensely interested in other people.", weight: 1 },
        { q: "I feel that life is very rewarding.", weight: 1 },
        { q: "I have very warm feelings towards almost everyone.", weight: 1 },
        { q: "I rarely wake up feeling rested.", weight: -1 },
        { q: "I am not particularly optimistic about the future.", weight: -1 },
        { q: "I find most things amusing.", weight: 1 },
        { q: "I am always committed and involved.", weight: 1 },
        { q: "Life is good.", weight: 1 },
        { q: "I do not think that the world is a good place.", weight: -1 },
        { q: "I laugh a lot.", weight: 1 },
        { q: "I am well satisfied about everything in my life.", weight: 1 },
        { q: "I don’t think I look attractive.", weight: -1 },
        { q: "There is a gap between what I would like to do and what I have done.", weight: -1 },
        { q: "I am very happy.", weight: 1 },
        { q: "I find beauty in some things.", weight: 1 },
        { q: "I always have a cheerful effect on others.", weight: 1 },
        { q: "I can fit in (find time for) everything I want to.", weight: 1 },
        { q: "I feel that I am not especially in control of my life.", weight: -1 },
        { q: "I feel able to take anything on.", weight: 1 },
        { q: "I feel fully mentally alert.", weight: 1 },
        { q: "I often experience joy and elation.", weight: 1 },
        { q: "I don’t find it easy to make decisions.", weight: -1 },
        { q: "I don’t have a particular sense of meaning and purpose in my life.", weight: -1 },
        { q: "I feel I have a great deal of energy.", weight: 1 },
        { q: "I usually have a good influence on events.", weight: 1 },
        { q: "I don’t have fun with other people.", weight: -1 },
        { q: "I don’t feel particularly healthy.", weight: -1 },
        { q: "I don’t have particularly happy memories of the past.", weight: -1 }

    ],
    testName: "Oxford Happiness Questionnaire",
    numChoices: 6,
    scoringFunction: function (choice, weight) {
        // We count from 1

        //console.log(choice, weight)
        if (weight == 1) {
            choice += 1
            return choice;
        } else {
            // For negative choices 1 -> 6, 2 -> 5, 3 -> 4, 4 -> 3, 5 -> 2, 6 -> 1
            return this.numChoices - choice;
        }
    }
}

function populateTest(test) {
    $("#title").text(test.testName);
    $("#title").after("<div class='test-item'></div>".repeat(test.testItems.length));

    for (let i = 0; i < test.testItems.length; i++) {
        $(".test-item").eq(i).append(
               `<div class="question-title">${test.testItems[i].q}</div>
                <div class="questionscontainer">
                    <span class="left-label">Strongly disagree</span>
                    <span class="qcontainer" id=answers-q${i}></span>
                    <span class="right-label">Strongly agree</span> 
                </div>`
        )

        for (let j = 0; j < test.numChoices; j++) {
            $(`#answers-q${i}`).append(
                `<input type="radio" name="question${i}" class="choice" id="q${i}c${j}">`
            )
        }
        $(`#q${i}c0`).prop("checked", true)
    }
}

$("#results-btn").click(function () {
    score = 0

    for (let i = 0; i < test.testItems.length; i++) {
        for (let j = 0; j < test.numChoices; j++) {
            if ($(`#q${i}c${j}`).is(":checked")) {
                score += test.scoringFunction(j, test.testItems[i].weight);
            }
        }
    }

    score = score / test.testItems.length;
    resText = $("#results-text").text(`Your happiness score ${score.toFixed(2)}`)

    // Remove the hidden attribute
    inrepretation = $("#interpretation").show()
})

$(document).ready(function () {
    populateTest(test);
})
