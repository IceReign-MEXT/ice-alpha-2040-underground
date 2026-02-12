const lessons = [
    "LESSON 1: The laptop is a cage. The mobile phone is the key to the underground.",
    "LESSON 2: Liquidity is like ice—if it's not locked, it melts away. We freeze it.",
    "LESSON 3: The 4% Loop is not a tax; it is the fuel for the 2040 Bypass.",
    "LESSON 4: In a world of AI noise, code is the only language that doesn't lie."
];

function getLesson() {
    console.log("🏫 ICE-ALPHA TRAINING MODULE:");
    console.log(lessons[Math.floor(Math.random() * lessons.length)]);
}

getLesson();
