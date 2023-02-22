interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const parseArgs = (args: string[]): { daily_hours: number[], target: number } => {
    if (args.length < 1) {
        throw new Error("usage: npm run calculateExercises <target> <daily_hours>");
    }
    const numbers = args.map(arg => Number(arg));

    for (const n of numbers) {
        if (isNaN(n)) {
            throw new Error("All arguments must be numbers.");
        }
    }
    return {
        target: numbers[0],
        daily_hours: numbers.slice(1)
    }
}

const calculateExercises = (daily_hours: number[], target: number): Result => {
    const periodLength = daily_hours.length;
    const trainingDays = daily_hours.filter(hour => hour !== 0).length;
    const average = daily_hours.reduce((acc, hour) => acc + hour, 0) / periodLength;
    const success = average > target;
    let ratingDescription: string;
    let rating: number;
    if (average / target > 1) {
        ratingDescription = "Good";
        rating = 3;
    } else if (average /target > 0.5) {
        rating = 2;
        ratingDescription = "could be better"
    } else {
        rating = 1;
        ratingDescription = "bad"
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

try {
    const { daily_hours, target } = parseArgs(process.argv.slice(2));
    console.log(calculateExercises(daily_hours, target));
} catch (error: unknown) {
    let message = "Error";
    if (error instanceof Error) {
        message += ": " + error.message;
    }
    console.error(message);
}

