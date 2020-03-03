import React from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { requestUpload } from '../../redux/actions/actions';
import {
    PacmanIndicator,
} from 'react-native-indicators';
import { Header } from 'react-native-elements';
class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filePath: {},
            cargandoLog: false,
        };
        this.cargarImagen = this.cargarImagen.bind(this);
        this.chooseFile = this.chooseFile.bind(this);
        this.backHome = this.backHome.bind(this);
    }
    cargarImagen(event) {
        const { path } = this.props;
        this.props.requestUpload(this.state.filePath.data, path, this.state.filePath.fileName);
        event.preventDefault();
        this.setState({ cargandoLog: true });
        setTimeout(() => {
            const { message } = this.props;
            this.setState({ cargandoLog: false });
            if (message === 'Archivo Almacenado') {
                alert(message);
            }
        }, 3000);


    }
    backHome() {
        this.props.navigation.navigate('Lista')
    }
    chooseFile = () => {
        var options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let source = response;
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    filePath: source,
                });
            }
        });
    };
    render() {
        return (
            <View>
                <Header
                    containerStyle={{
                        backgroundColor: '#6566FF',
                        justifyContent: 'space-around'
                    }}
                    leftComponent={<Icon  color="white" name="view-sequential" size={40} onPress={() => this.props.navigation.openDrawer()} />}
                    rightComponent={<Icon color="white" name="reply" size={40} onPress={() => this.backHome()} />}
                />
                <View style={styles.container}>
                    {
                        this.state.cargandoLog ? <View><PacmanIndicator color="green" /></View> :
                            <View>
                                <Image
                                    source={{
                                        uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
                                    }}
                                    style={{ width: 350, height: 350 }}
                                />

                                <Text style={{ alignItems: 'center', width: '60%', fontSize: 10 }}>
                                    Nombre: {this.state.filePath.fileName}

                                </Text>
                                <Text style={{ alignItems: 'center', width: '60%', fontSize: 10 }}>
                                    Tamaño: {this.state.filePath.fileSize} bytes
                                    </Text>
                                <View style={styles.button}>
                                    <View>
                                        <Button title="Seleccionar" onPress={this.chooseFile} />

                                    </View>
                                    <View style={{ marginLeft: '3%' }}>
                                        <Button title="Subir" onPress={this.cargarImagen} />
                                    </View>
                                </View>
                            </View>
                    }
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        usuario: state.userRedux.usuario,
        message: state.userRedux.message,
        path: state.userRedux.path,
    };
}
const mapDispatchToProps = {
    requestUpload
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        margin: '4%',
        flexDirection: 'row',
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
});