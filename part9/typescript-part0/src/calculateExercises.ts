interface ExerciseStat {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

// interface Args1 {
//     exercises: number[],
//     target: number
// }

// const parseArgs1 = (args: string[]): Args1 => {
//     // at least has a target and exercises
//     if (args.length < 4) {
//         throw new Error("usage: npm run calculateExercises <target> <exercises>");
//     }
//     const target = Number(args[2]);
//     const exerciseArgs = args.slice(3);
//     const exercises = exerciseArgs.map(exercise => Number(exercise));
//     if (isNaN(target) ||
//         exercises.filter(exercise => isNaN(exercise)).length > 0) {
//         throw new Error("all paramters must be number");
//     }
//     return {
//         exercises,
//         target
//     };
// };

export const calculateExercises = (exercises: number[], target: number): ExerciseStat => {
    const periodLength = exercises.length;
    const trainingDays = exercises.filter(exercise => exercise !== 0).length;
    const average = exercises.reduce((a, b) => a + b, 0) / periodLength;
    const success = average > target ? true : false;
    let rating: number;
    let ratingDescription: string;
    if (average / target < 0.5) {
        rating = 1;
        ratingDescription = "come on, it's terrible";
    } else if (average / target < 1) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 3;
        ratingDescription = "great, you did it";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

// try {
//     const { target, exercises } = parseArgs1(process.argv);
//     console.log(calculateExercises(exercises, target));
// } catch (error: unknown) {
//     let errorMessage = "something bad happened ";
//     if (error instanceof Error) {
//         errorMessage += "Error: " + error.message;
//     }
//     console.log(errorMessage);
// }
