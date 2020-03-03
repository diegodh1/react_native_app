import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestSeccion } from '../redux/actions/actions';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import {
    PacmanIndicator,
} from 'react-native-indicators';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: '',
            cargandoLog: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.props.requestSeccion(this.state.user, this.state.pass);
        event.preventDefault();
        this.AnimationRef.bounce();
        this.setState({ cargandoLog: true });
        setTimeout(() => {
            this.setState({ user: '', pass: '' });
            const { message } = this.props;
            this.setState({ cargandoLog: false });
            if (message === 'Ingreso Realizado') {
                this.props.navigation.navigate('home');
            }
        }, 1000);


    }
    componentDidUpdate(preProps, preState, actState) {
    }
    render() {
        const { message } = this.props;

        return (
            this.state.cargandoLog ? <View style={styles.loading}><PacmanIndicator color="green" /></View> :
            <View style={styles.container}>
                <UsuarioInvalido message={message} />
                <Animatable.View animation="rotate" iterationCount={1} direction="alternate">
                    <Image
                        style={styles.logo}
                        source={require('../../public/integrapps.jpg')}
                    />
                </Animatable.View>
                <Animatable.View animation="fadeInUp" iterationCount={1} direction="alternate">
                    <View style={styles.view}>
                        <Icon name="account-circle" size={30} style={styles.icon} />
                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            name="user"
                            value={this.state.user}
                            placeholder="Usuario"
                            placeholderTextColor="black"
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({ user: text })} />
                    </View>
                </Animatable.View>
                <Animatable.View animation="fadeInUp" iterationCount={1} direction="alternate">
                    <View style={styles.view}>
                        <Icon name="key" size={30} style={styles.icon} />
                        <TextInput style={styles.input}
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            placeholder="Contraseña"
                            name="pass"
                            value={this.state.pass}
                            placeholderTextColor="black"
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({ pass: text })} />
                    </View>
                </Animatable.View>
                <Animatable.View animation="fadeInUp" iterationCount={1} direction="alternate" ref={ref => (this.AnimationRef = ref)}>
                    <View>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={this.handleSubmit}>
                            <Icon name="checkbox-marked-circle" size={40} style={styles.iconButton} />
                            <Text style={styles.submitButtonText}> Ingresar </Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>

            </View >
        )
    }
}

function UsuarioInvalido(props) {
    const mensaje = props.message;
    if (mensaje !== 'Ingreso Realizado' && mensaje !== '') {
        return (
            <Animatable.View animation="bounceInRight" iterationCount={1} direction="alternate">
                <View style={styles.viewAlert}>
                    <Text style={{ color: "white" }}>{mensaje}
                    </Text>
                </View>
            </Animatable.View>

        )
    }
    else {
        return (
            <Animatable.View animation="bounceInRight" iterationCount={1} direction="alternate">
                <View>
                    <Text style={styles.textTitle}>
                        Integrapps S.A
                    </Text>
                </View>
            </Animatable.View>);
    }
}

const mapStateToProps = (state) => {
    return {
        usuario: state.userRedux.usuario,
        message: state.userRedux.message,
    };
}
const mapDispatchToProps = {
    requestSeccion
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        marginBottom: '10%',
        marginTop: '7%',
    },
    icon: {
        color: '#505050',
        marginLeft: '5%'
    },
    iconButton: {
        color: 'white',
        marginLeft: '2%'
    },
    container: {
        flex: 1,
        marginTop: '20%',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
    },
    view: {
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%',
        borderBottomWidth: 1,
        borderRadius: 8,
        textAlign: "center",
        margin: '2%',
    },
    input: {

        height: 50,
        width: '80%',
        textAlign: "center",
        opacity: 0.5,
        fontSize: 18,
    },
    submitButton: {
        flexDirection: 'row',
        textAlign: "center",
        backgroundColor: '#6566FF',
        padding: 10,
        margin: '10%',
        marginTop: '15%',
        height: 40,
        borderRadius: 50,
        height: 60,
        width: '90%',

    },
    submitButtonText: {
        textAlign: "center",
        color: 'white',
        fontSize: 20,
        marginLeft: '13%',


    },
    viewAlert: {
        marginBottom: '20%',
        backgroundColor: 'red',
        width: '80%',
        textAlign: "center",
        padding: 15
    },
    textTitle: {
        textShadowColor: 'rgba(0, 0, 0, 0.70)',
        textShadowOffset: { width: -0.5, height: 1 },
        textShadowRadius: 3,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
})