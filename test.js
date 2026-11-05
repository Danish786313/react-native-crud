const handleCalculate = (expression: string) => {
        try {
            const evalResult = eval(expression);
            return evalResult;
        } catch (error) {
            return null;
        }
    };

console.log("handleCalculate function:", handleCalculate("2 + 3 * 4")); // Example usage of the function