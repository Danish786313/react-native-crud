import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity, Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

function Calculator(props: any) {
    const [result, setResult] = useState<number | null>(0);
    const [expression, setExpression] = useState<string>('');

    useEffect(() => {
        setResult(0);
    }, []);

    const handleCalculate = () => {
        try {
            if (!expression.trim()) {
                setResult(null);
                return;
            }
            const evalResult = eval(expression);
            if (typeof evalResult !== 'number' || !Number.isFinite(evalResult)) {
                setResult(null);
                return;
            }
            setResult(evalResult);
        } catch (error) {
            setResult(null);
        }
    };

    const addToExpression = (value: string) => {
        setExpression(prev => prev + value);
    };

    const clearExpression = () => {
        setExpression('');
        setResult(0);
    };

    const clearLastCharacter = () => {
        setExpression(prev => prev.slice(0, -1));
    };


    return (
        <View style={styles.container}>
                {result && (
                    <Text style={{ fontSize: 20, marginTop: 20 }}>{result}</Text>
                )}

                <TextInput
                    placeholder="Enter expression (e.g. 10+20)"
                    value={expression}
                    onChangeText={setExpression}
                    keyboardType="numbers-and-punctuation"
                    style={{
                        width: width * 0.8,
                        height: height * 0.09,
                        borderColor: 'gray',
                        borderWidth: 1,
                        marginBottom: 10,
                        backgroundColor: '#fff',
                        paddingHorizontal: 10,
                        borderRadius: 5,
                    }}
                />
            
            

            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', width: '80%', gap: 10 }}>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => clearLastCharacter()}

                >
                    <Text style={styles.calculatorText}>X</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => clearExpression()}
                >
                    <Text style={styles.calculatorText}>AC</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => addToExpression('%')}
                    
                >
                    <Text style={styles.calculatorText}>%</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => addToExpression('/')}

                >
                    <Text style={styles.calculatorText}>/</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', width: '80%', gap: 10 }}>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => addToExpression('7')}

                >
                    <Text style={styles.calculatorText}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => addToExpression('8')}
                >
                    <Text style={styles.calculatorText}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => addToExpression('9')}
                >
                    <Text style={styles.calculatorText}>9</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => addToExpression('*')}
                >
                    <Text style={styles.calculatorText}>*</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => addToExpression('6')}
                >
                    <Text style={styles.calculatorText}>6</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => addToExpression('-')}
                >
                    <Text style={styles.calculatorText}>-</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', width: '80%', gap: 10 }}>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => addToExpression('4')}
                >
                    <Text style={styles.calculatorText}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => addToExpression('5')}
                >
                    <Text style={styles.calculatorText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => addToExpression('6')}
                >
                    <Text style={styles.calculatorText}>6</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => addToExpression('-')}

                >
                    <Text style={styles.calculatorText}>-</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', width: '80%', gap: 10 }}>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => addToExpression('1')}

                >
                    <Text style={styles.calculatorText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => addToExpression('2')}
                >
                    <Text style={styles.calculatorText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => addToExpression('3')}

                >
                    <Text style={styles.calculatorText}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => addToExpression('+')}
                >
                    <Text style={styles.calculatorText}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', width: '80%', gap: 10 }}>
                <TouchableOpacity
                    style={styles.calculatorButton}

                >
                    <Text style={styles.calculatorText}>+/-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => addToExpression('0')}

                >
                    <Text style={styles.calculatorText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => addToExpression('.')}
                >
                    <Text style={styles.calculatorText}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.calculatorButton}
                    onPress={() => handleCalculate()}
                >
                    <Text style={styles.calculatorText}>=</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D6D7ED',
    },
    calculatorButton: {
        backgroundColor: '#9295D2',
        width: width * 0.20,
        height: height * 0.07,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calculatorText: {
        color: '#fff',
        fontSize: 30,
    },
});

export default Calculator;