let current = -1;

let dialog;
let question;
let answerField;

let askLove = false;
let queue = 0;

function next(index) {
    if (!dialog || !question || !answerField) {
        return;
    }
    let part;
    if(askLove) {
        part = love;
    } else if(queue > 0 || queue < 0) {
        queue--;
        part = repeating[repeatingIndex%repeating.length];
        repeatingIndex++;
    }
    if(part === undefined) {
        if (index === undefined) {
            current++;
        } else {
            current = index;
        }
        if(current >= story.length) {
            queue = -1;
            next();
            return;
        }
        part = story[current];
    }
    queue = part.queue ? part.queue : 0;
    question.innerText = stats.name + ": " + part.question;
    if(part.special) {
        switch (part.special) {
            case "blush":
                setBlush();
                break;
        }
    }
    putAnswers(part.answers, part.type);
}

function putAnswers(answers, type) {
    clearAnswers();
    for(let a of answers) {
        if(type) {
            if(!a.extras) {
                a.extras = {};
            }
            a.extras.type = type;
        }
        let el = buildAnswer(a.text, a.value, a.color, a.next, a.extras);
        answerField.appendChild(el);
    }
}

function buildAnswer(text, value, color, next, extras) {
    let out = document.createElement("div");
    dialog.classList.remove("out");
    out.className = "text answer" + (color ? " " + color : "");
    out.innerText = text;
    out.setAttribute("value", value);
    if(next) {
        out.setAttribute("next", next);
    }
    if(extras) {
        for(let x in extras) {
            out.setAttribute(x, extras[x]);
        }
    }
    return out;
}

function buildResponse(text) {
    dialog.classList.remove("out");
    clearAnswers();
    question.innerText = stats.name + ": " + text;
    setTimeout(removeResponse, 2000);
}

function removeResponse() {
    dialog.classList.add("out");
    setTimeout(next, 2000);
}

function clearAnswers() {
    let child;
    while (child = answerField.firstChild) {
        answerField.removeChild(child);
    }
}

function queueLove() {
    askLove = true;
}

document.addEventListener('click', event => {
    if(event.target.classList.contains("answer")) {
        onAnswer(event.target);
    }
});

function onAnswer(element) {
    let type = element.getAttribute("type");
    let value = element.getAttribute("value");
    if(type === "name") {
        stats.name = value;
        stats.noun = NOUNS[element.getAttribute("noun")];
    } else if(type === "love") {
        if(value === "true") {
            onLove();
        } else if(value === "false") {
            onLoveDeny();
        }
    }

    for(let attributeName of element.getAttributeNames()) {
        switch (attributeName) {
            case "type":
            case "value":
            case "class":
            case "id":
            case "answer":
            case "noun":
                break;
            default:
                stats[attributeName] += parseInt(element.getAttribute(attributeName));
        }
    }

    if(element.hasAttribute("response")) {
        buildResponse(element.getAttribute("response"));
    } else {
        dialog.classList.add("out");
        setTimeout(next, 4000);
    }
}

let colors = ["pink","blue","black","crimson"];
let objects = ["clouds", "curtains", "petals", "dirt"];
let verbs = ["walk", "fly", "swim", "drive"];
let randomNumber = random(0,colors.length);
let favcolor = colors[randomNumber];
let othercolor = [colors[(randomNumber+1)%colors.length],colors[(randomNumber+3)%colors.length],colors[(randomNumber+2)%colors.length]];
randomNumber = random(0,objects.length);
let favobject = objects[randomNumber];
let otherobject = [objects[(randomNumber+1)%objects.length],objects[(randomNumber+3)%objects.length],objects[(randomNumber+2)%objects.length]];
randomNumber = random(0,verbs.length);
let favverb = verbs[randomNumber];
let otherverb = [verbs[(randomNumber+1)%verbs.length],verbs[(randomNumber+3)%verbs.length],verbs[(randomNumber+2)%verbs.length]];

const story = [
    {
        // 0
        "question": "Hellow! I'm super excited to meet you! What do you want to call me?",
        "type": "name",
        "queue": 1,
        "answers": [
            {
                "value": boyname,
                "text": boyname,
                "color": "pink",
                "extras": {
                    "response": "That's a pretty name!",
                    "noun": "HE"
                }
            },
            {
                "value": girlname,
                "text": girlname,
                "color": "blue",
                "extras": {
                    "response": "That's a pretty name!",
                    "noun": "SHE"
                }
            },
            {
                "value": "Flower",
                "text": "It a flower. It no name!",
                "extras": {
                    "happiness": -10,
                    "affection": -20,
                    "response": "Hey! That's not nice! I want a name too",
                    "noun": "IT"
                }
            }
        ]
    },
    {
        // 1
        "question": "Did you know my favourite color is " + favcolor + "?",
        "queue": 2,
        "answers": [
            {
                "text": "No I didn't, but I will remember",
                "extras": {
                    "affection": 2,
                    "happiness": 2,
                    "response": "Oki!"
                }
            },
            {
                "text": "Yes I did",
                "extras": {
                    "response": "You did? That's kinda creepy!",
                    "affection": -4
                }
            },
            {
                "text": "I thought it was yellow",
                "extras": {
                    "response": "Yellow is a pretty color, but not my favourite"
                }
            }
        ]
    },
    {
        // 2
        "question": "I dream about " + favobject + " very often",
        "queue": 3,
        "answers": [
            {
                "text": "Eh.. okay",
                "extras": {
                    "response": "What?"
                }
            },
            {
                "text": "Do you know why?",
                "extras": {
                    "response": "Nope, no idea! Probably some flower thing"
                }
            }
        ]
    },
    {
        // 3
        "question": "Do you remember my favourite color?",
        "queue": 1,
        "answers": [
            {
                "text": `${othercolor[0]}?`,
                "extras": {
                    "affection": -10,
                    "happiness": -20,
                    "response": "No it was " + favcolor + "!"
                }
            },
            {
                "text": `${favcolor}!`,
                "extras": {
                    "affection": 10,
                    "happiness": 20,
                    "response": "Yes that was it!"
                }
            },
            {
                "text": `I think it was ${othercolor[1]}`,
                "extras": {
                    "affection": -10,
                    "happiness": -20,
                    "response": "No it was " + favcolor + "!"
                }
            },
            {
                "text": `It's ${othercolor[2]}`,
                "extras": {
                    "affection": -10,
                    "happiness": -20,
                    "response": "No it was " + favcolor + "!"
                }
            }
        ]
    },
    {
        // 5
        "question": "Sometimes I wonder what it would be like to " + favverb,
        "queue": 3,
        "answers": [
            {
                "text": "I can imagine you'd wonder that since you can't move ever"
            }
        ]
    },
    {
        // 4
        "question": "Guess what I dreamt about last night!",
        "queue": 1,
        "answers": [
            {
                "text": `${otherobject[0]}?`,
                "extras": {
                    "affection": -10,
                    "happiness": -20,
                    "response": "No it was " + favobject + "!"
                }
            },
            {
                "text": `Maybe ${otherobject[1]}`,
                "extras": {
                    "affection": -10,
                    "happiness": -20,
                    "response": "No it was " + favobject + "!"
                }
            },
            {
                "text": `You tell me`,
                "extras": {
                    "affection": -5,
                    "happiness": -10,
                    "response": "It was the same as always"
                }
            },
            {
                "text": `Let me guess: ${favobject}?`,
                "extras": {
                    "affection": 10,
                    "happiness": 20,
                    "response": "Yes that was it! Hehe, as usual"
                }
            }
        ]
    },
    {
        // 6
        "question": "What was the thing I wondered about?",
        "answers": [
            {
                "text": `${otherverb[0]}?`,
                "extras": {
                    "affection": -10,
                    "happiness": -20,
                    "response": "No it was " + favverb + "!"
                }
            },
            {
                "text": `${otherverb[1]}!`,
                "extras": {
                    "affection": -10,
                    "happiness": -20,
                    "response": "No it was " + favverb + "!"
                }
            },
            {
                "text": `I think it was ${favverb}`,
                "extras": {
                    "affection": 10,
                    "happiness": 20,
                    "response": "Yes that was it!"
                }
            },
            {
                "text": `It's ${otherverb[2]}`,
                "extras": {
                    "affection": -10,
                    "happiness": -20,
                    "response": "No it was " + favverb + "!"
                }
            }
        ]
    }
];

const repeating = [
    {
        "question": "The weather is pretty nice today, isn't it?",
        "answers": [
            {
                "text": "Yes, I love sun!",
                "extras": {
                    "response": "I love sun too, but sometimes I get too much sun",
                }
            },
            {
                "text": "Yes, but I like rain better",
                "extras": {
                    "response": "A mix of both is best! Too much rain will make me have too much water"
                }
            },
            {
                "text": "I can't see the weather",
                "extras": {
                    "response": "It's all make believe anyway"
                }
            }
        ]
    },
    {
        "question": "Oh, you touch my tralala",
        "answers": [
            {
                "text": "Eh... what?!",
                "extras": {
                    "happiness": -5,
                    "response": "Ah forget it",
                }
            },
            {
                "text": "Mmmm, my ding ding dong",
                "extras": {
                    "affection": 1,
                    "response": "La lalala lalala"
                }
            },
            {
                "text": "Nope, nope, nope! I'm out!",
                "extras": {
                    "affection": -5,
                    "response": "Duh, it's a song"
                }
            }
        ]
    },
    {
        "question": "Are hot dogs sandwiches?",
        "answers": [
            {
                "text": "Eh... what?!",
                "extras": {
                    "happiness": -5,
                    "response": "Ah forget it",
                }
            },
            {
                "text": "Hot dogs are tacos by cube rule",
                "extras": {
                    "affection": 1,
                    "response": "Hm hm!"
                }
            },
            {
                "text": "Yes",
                "extras": {
                    "response": "No they aren't. Pff!"
                }
            }
        ]
    },
    {
        "question": "Can you help me solve a math problem? I need to find x for 2x² + x = 0.75",
        "answers": [
            {
                "text": "x1 = -7 and x2 = 5!",
                "extras": {
                    "affection": 1,
                    "happiness": 1,
                    "response": "Thanks! That was it!"
                }
            },
            {
                "text": "Eh... what?!",
                "extras": {
                    "happiness": -5,
                    "response": "Ah forget it, I'll ask google",
                }
            },
            {
                "text": "x1 = 7 and x2 = -5",
                "extras": {
                    "happiness": -1,
                    "response": "My entire code broke because it was wrong!"
                }
            }
        ]
    },
    {
        "question": "What does it feel like to walk on your soiled shoes and go to places?",
        "answers": [
            {
                "text": "The same as what it feels like to use a flowerpot to go places",
                "extras": {
                    "affection": 4,
                    "happiness": 4,
                    "response": "Touché! hehe"
                }
            },
            {
                "text": "Eh... what?!",
                "extras": {
                    "happiness": -5,
                    "response": "Ah forget it",
                }
            }
        ]
    },
    {
        "question": "I see you wear clothes, will you dress me up too?",
        "answers": [
            {
                "text": "Do you want me to dress you up?",
                "extras": {
                    "affection": 2,
                    "happiness": 4,
                    "response": "Oh, no, it was just a general question"
                }
            },
            {
                "text": "Sure, let me grab some died plants to wrap you in a flower dress.",
                "extras": {
                    "happiness": -5,
                    "response": "Ah forget it, I'll ask google",
                }
            },
            {
                "text": "Sure, ima see what I can find next time I go shopping.",
                "extras": {
                    "response": "Ooh, fancy! But I hope it doesn't suffocate me"
                }
            },
            {
                "text": "Eh... what?!",
                "extras": {
                    "happiness": -5,
                    "response": "Ah forget it",
                }
            }
        ]
    },
    {
        "question": "Who waters you if you water me?",
        "answers": [
            {
                "text": "Haha, don't worry, I don't need to be watered. I can simply drink from these bottles here",
                "extras": {
                    "happiness": 4,
                    "response": "Ooooh okay"
                }
            },
            {
                "text": "I am watering myself when I go shower everyday.",
                "extras": {
                    "response": "Hmm..."
                }
            },
            {
                "text": "Eh... what?!",
                "extras": {
                    "happiness": -5,
                    "response": "Ah forget it",
                }
            }
        ]
    },
    {
        "question": "I hope the sun will come up tomorrow",
        "answers": [
            {
                "text": "Why wouldn't it?",
                "extras": {
                    "response": "Dunno. I just hope it does"
                }
            },
            {
                "text": "I doubt it will, news said today was the last day of sun",
                "extras": {
                    "affection": -4,
                    "happiness": -10,
                    "response": "Hey! Don't scare me!"
                }
            },
            {
                "text": "Eh... what?!",
                "extras": {
                    "happiness": -5,
                    "response": "Ah forget it",
                }
            }
        ]
    },
    {
        "question": "I hope the sun will come up tomorrow",
        "answers": [
            {
                "text": "Why wouldn't it?",
                "extras": {
                    "response": "Dunno. I just hope it does"
                }
            },
            {
                "text": "I doubt it will, news said today was the last day of sun",
                "extras": {
                    "affection": -4,
                    "happiness": -10,
                    "response": "Hey! Don't scare me!"
                }
            },
            {
                "text": "Eh... what?!",
                "extras": {
                    "happiness": -5,
                    "response": "Ah forget it",
                }
            }
        ]
    }
];

let repeatingIndex = random(0, repeating.length);

const love = {
    "question": "U-u-uhhm.. You know.. I really like you.. like really really.. like a lot... so I wanted to ask you.. could we.. maybe.. go on a.. d-date?",
    "special": "blush",
    "type": "love",
    "answers": [
        {
            "value": true,
            "text": "Yes, I've felt the same about you"
        },
        {
            "value": false,
            "text": "No, I like you.. but only as friend"
        },
        {
            "value": false,
            "text": "I already have a partner..."
        },
        {
            "value": false,
            "text": "It's complicated..."
        }
    ]
};
