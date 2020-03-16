import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestPaths, requestDirectoy, requestFile } from '../../redux/actions/actions';
import { View, Text, Button, Dimensions, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import {
    PacmanIndicator,
} from 'react-native-indicators';
import { Header } from 'react-native-elements';

class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            actualDirectory: [],
            show: true,
        };
        this.handleClick = this.handleClick.bind(this);
        this.backDirectory = this.backDirectory.bind(this);
        this.subirImagen = this.subirImagen.bind(this);
    }
    componentDidMount() {
        this.props.requestPaths();
    }
    handleClick(path, event, ext, refresh) {
        if (ext && ext !== 'none' && refresh == false) {
            this.props.requestFile(path, ext);
            event.preventDefault();
            setTimeout(() => {
                this.props.navigation.navigate('Frame')
            }, 500);
        }
        else if (refresh == true) {
            const { actualDirectory } = this.state;
            let size = actualDirectory.length;
            this.props.requestDirectoy(actualDirectory[size - 1]);
        }
        else {
            const { actualDirectory } = this.state;
            actualDirectory.push(path);
            this.setState({
                actualDirectory: actualDirectory
            });
            this.props.requestDirectoy(path);
            event.preventDefault();
        }
    }
    backDirectory(event) {
        const { actualDirectory } = this.state;
        if (actualDirectory.length > 1) {
            actualDirectory.pop();
            const path = actualDirectory[actualDirectory.length - 1];
            this.setState({
                actualDirectory: actualDirectory
            });
            this.props.requestDirectoy(path);
            event.preventDefault();
        }
        else {
            actualDirectory.pop();
            this.props.requestPaths();
        }
    }
    subirImagen(event) {
        this.props.navigation.navigate('Gallery')
    }
    render() {
        const { usuario, paths, message, cargando } = this.props;
        return (
            <View>

                {
                    cargando ? <View style={styles.loading}><PacmanIndicator color="green" /></View> :
                        <View>
                            <Header
                                containerStyle={{
                                    backgroundColor: '#6566FF',
                                    justifyContent: 'space-around'
                                }}
                                leftComponent={<Icon color='white' name="upload" size={40} onPress={(event) => this.subirImagen(event)} />}
                                centerComponent={<Icon color='white' name="restart" size={40} onPress={(event) => this.handleClick('', '', '', true)} />}
                                rightComponent={<Icon color='white' name="reply" size={40} onPress={(event) => this.backDirectory(event)} />}
                            />
                            <SafeAreaView >
                                <ScrollView >
                                    <View style={{marginBottom:'70%'}}>
                                        {
                                            paths.map((path) => (
                                                <TouchableOpacity
                                                    key={path.nombre}
                                                    style={styles.container}
                                                    onPress={(event) => this.handleClick(path.ruta, event, path.extension, false)}>
                                                    < GetIcon ext={path.extension} />
                                                    <Text style={styles.text}>
                                                        {path.nombre}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))
                                        }

                                    </View>

                                </ScrollView>
                            </SafeAreaView>
                        </View>
                }

            </View>
        );
    }
}

const GetIcon = props => {
    const { ext } = props;
    switch (ext) {
        case "pdf":
            return <Icon name="pdf-box" style={{ color: "#ff0000" }} size={25} />
            break;
        case "png":
            return <Icon name="image" style={{ color: "#1e90ff" }} size={25} />
            break;
        case "jpg":
            return <Icon name="image" style={{ color: "#1e90ff" }} size={25} />
            break;
        case "jpeg":
            return <Icon name="image" style={{ color: "#1e90ff" }} size={25} />
            break;
        case "gif":
            return <Icon name="image" style={{ color: "#1e90ff" }} size={25} />
            break;
        case "PDF":
            return <Icon name="pdf-box" style={{ color: "#ff0000" }} size={25} />
            break;
        case "PNG":
            return <Icon name="image" style={{ color: "#1e90ff" }} size={25} />
            break;
        case "JPG":
            return <Icon name="image" style={{ color: "#1e90ff" }} size={25} />
            break;
        case "JPEG":
            return <Icon name="image" style={{ color: "#1e90ff" }} size={25} />
            break;
        case "GIF":
            return <Icon name="image" style={{ color: "#1e90ff" }} size={25} />
            break;
        default:
            return <Icon name="folder-open" style={{ color: "#EBBA2B" }} size={25} />

    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        marginTop: 3,
        borderBottomColor: 'black',
    },
    text: {
        color: 'black',
        fontSize: 15,
        marginLeft: 10,
        borderBottomWidth: 1
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        marginTop: '50%',
        top: 0,
        bottom: 0,
    }
})

const mapStateToProps = (state) => {
    return {
        paths: state.userRedux.paths,
        message: state.userRedux.message,
        usuario: state.userRedux.usuario,
        directorys: state.userRedux.directorys,
        cargando: state.userRedux.cargando,
    };
}
const mapDispatchToProps = {
    requestPaths,
    requestDirectoy,
    requestFile,
}
export default connect(mapStateToProps, mapDispatchToProps)(Lista);

