'use strict'

import React, {Component, StyleSheet, Text, View, TouchableOpacity} from 'react-native'

class Spinner extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.value ? this.props.value : 0,
            activeOpacity: 1,
        }
    }
    render() {
        const {disabled} = this.props

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.btn, styles.btnSub]}
                    onPress={this.sub.bind(this)}
                    activeOpacity={disabled ? 1 : 0.5}>
                    <Text style={[styles.btnText, disabled ? styles.btnTextDisabled : null]}>-</Text>
                </TouchableOpacity>
                <Text style={[styles.content, disabled ? styles.disabled : null]}>
                    {this.state.value}
                </Text>
                <TouchableOpacity
                    style={[styles.btn, styles.btnAdd]}
                    onPress={this.add.bind(this)}
                    activeOpacity={disabled ? 1 : 0.5}>
                    <Text style={[styles.btnText, disabled ? styles.btnTextDisabled : null]}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }
    add() {
        this.opearte.call(this, 1)
    }
    sub() {
        this.opearte.call(this, -1)
    }
    getValue() {
        return this.state.value
    }
    opearte(direction) {
        this.setState(function (previousState, currentProps) {
            if (!currentProps.disabled) {
                let step = parseFloat(currentProps.step),
                    value = parseFloat(previousState.value),
                    maxStepDigit = 10,
                    result

                // calculate
                step = isNaN(step) ? 1 : step
                result = parseFloat((value + step * direction).toPrecision(maxStepDigit))

                // trigger onChange
                this.props.onChange ? this.props.onChange(result) : null

                return {value: result}
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        paddingTop: 6,
        paddingBottom: 6,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        fontSize: 17,
        color: "#333",
        textAlign: 'center',
    },
    btn: {
        width: 50,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderColor: '#ddd',
    },
    btnText: {
        color: "#00afc7",
        textAlign: 'center',
    },
    btnTextDisabled: {
        color: "#aaa",
    },
    btnAdd: {
        borderLeftWidth: 1,
    },
    btnSub: {
        borderRightWidth: 1,
    },
    disabled: {
        color: '#aaa'
    },
})

module.exports = Spinner
