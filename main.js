import inquirer from "inquirer";
const Time = ["Hr", "Min", "Sec"];
const TimeEntry = {};
async function getCountdownTime() {
    for (let i = 0; i < 3; i++) {
        const CounterTime = [
            {
                type: "input",
                name: `enteredTime${i}`,
                message: `Enter the ${Time[i]} you want to count down`,
                validate: (value) => {
                    const numValue = parseInt(value);
                    if (isNaN(numValue) || numValue < 0) {
                        return "Please enter a valid non-negative number.";
                    }
                    return true;
                },
            },
        ];
        const answers = await inquirer.prompt(CounterTime);
        const enteredTime = parseInt(answers[`enteredTime${i}`]);
        TimeEntry[Time[i]] = enteredTime;
    }
    console.log("Countdown Timer Settings:");
    console.log(TimeEntry);
    const totalSeconds = TimeEntry["Hr"] * 3600 + TimeEntry["Min"] * 60 + TimeEntry["Sec"];
    console.log(`Total seconds: ${totalSeconds}`);
    // Call the Countdown function with the total seconds
    Countdown(totalSeconds);
}
getCountdownTime();
async function Countdown(totalSeconds) {
    let remainingSeconds = totalSeconds;
    const updateCountdown = () => {
        const hours = Math.floor(remainingSeconds / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = remainingSeconds % 60;
        process.stdout.write(`\rCountdown: ${hours} hours ${minutes} minutes ${seconds} seconds`);
        remainingSeconds--;
        if (remainingSeconds >= 0) {
            setTimeout(updateCountdown, 1000);
        }
        else {
            console.log("\nCountdown finished!");
        }
    };
    updateCountdown();
}
