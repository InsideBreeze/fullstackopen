const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / (height * height/10000);
    let message: string;
    if (bmi < 18.5) {
        message = "Underweight"
    } else if (bmi < 25) {
        message = "Normal"
    } else if (bmi < 30) {
        message = "Overweight";
    } else {
        message = "Obese";
    }
    return message;
}

// parse args given by commandline
const parseBmiArgs = (args: string[]): {height: number, weight: number} => {
    if (args.length !== 2) {
        throw new Error("usage: npm run calculateBmi -- height weight");
    }
    const height = Number(args[0]);
    const weight = Number(args[1]);

    if (isNaN(height) || isNaN(weight)) {
        throw new Error("arguments must be numbers");
    }
    return {
        height,
        weight
    }
}


try {
    const { height, weight } = parseBmiArgs(process.argv.slice(2,));
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let message = "Error";
    if (error instanceof Error) {
        message += ": " + error.message;
    }
    console.error(message);
}