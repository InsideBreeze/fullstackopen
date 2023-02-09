// interface Args {
//     height: number,
//     weight: number
// }

// const parseArgs = (args: string[]): Args => {
//     if (args.length !== 4) {
//         throw new Error("usage: npm run calculateBmi <height> <weight>");
//     }
//     const height = Number(args[2]);
//     const weight = Number(args[3]);
//     if (isNaN(height) || isNaN(weight)) {
//         throw new Error("weight and height must be valid number");
//     }
//     return {
//         height,
//         weight
//     }
// }

export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / (height * height / 10000);
    if (bmi < 18.5) {
        return "Underweight (thin)";
    } else if (bmi < 25) {
        return "Normal (healthy weight)";
    } else if (bmi < 30) {
        return "Overweight (a little overweight)";
    } else {
        return "obse (fat)";
    }
};



// try {
//     const { height, weight } = parseArgs(process.argv);
//     console.log(calculateBmi(height, weight));
// } catch (error: unknown) {
//     let errorMessage = "something bad happened"
//     if (error instanceof Error) {
//         errorMessage += "error: " + error.message;
//     }
//     console.log(errorMessage);
// }
