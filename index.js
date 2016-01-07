'use strict'

var React = require('react-native')

var {StyleSheet, Text, View, TouchableOpacity,} = React

var Spinner = React.createClass({
    getInitialState: function () {
        return {
            value: this.props.value ? this.props.value : 0,
            activeOpacity: 1,
        }
    },
    getDefaultProps: function () {
        return {
            step: 1,
        }
    },
    add: function () {
        opearte.call(this, 1)
    },
    sub: function () {
        opearte.call(this, -1)
    },
    render: function () {
        var props = this.props

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.btn, styles.btnSub]}
                    onPress={this.sub}
                    activeOpacity={props.disabled ? 1 : 0.5}>
                    <Text style={[styles.btnText, props.disabled ? styles.btnTextDisabled : {}]}>-</Text>
                </TouchableOpacity>
                <Text style={[styles.content, props.disabled ? styles.disabled : null]}>
                    {this.state.value}
                </Text>
                <TouchableOpacity
                    style={[styles.btn, styles.btnAdd]}
                    onPress={this.add}
                    activeOpacity={props.disabled ? 1 : 0.5}>
                    <Text style={[styles.btnText, props.disabled ? styles.btnTextDisabled : {}]}>+</Text>
                </TouchableOpacity>
            </View>
        )
    },
    getValue: function(){
        return this.state.value
    }
})

function opearte(direction) {
    this.setState(function (previousState, currentProps) {
        if (!currentProps.disabled) {
            var step = parseFloat(currentProps.step),
                value = parseFloat(previousState.value),
                maxStepDigit = 10,
                result

            // calculate
            step = isNaN(step) ? 1 : step
            result = parseFloat((value + step * direction).toPrecision(maxStepDigit))

            // trigger onChange
            this.props.onChange ? this.props.onChange(result) : null

            console.log(result);
            return {value: result}
        }
    })
}

var styles = StyleSheet.create({
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
