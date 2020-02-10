import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestPaths, requestDirectoy, requestFile } from '../../redux/actions/actions';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';


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
    }
    componentDidMount() {
        this.props.requestPaths();
    }
    handleClick(path, event, ext) {
        if (ext && ext !== 'none') {
            this.props.requestFile(path, ext);
            event.preventDefault();
            setTimeout(() => {
                this.props.navigation.navigate('Frame')
            }, 500);
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
        this.AnimationRef.rubberBand();
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
    render() {
        const { usuario, paths, message,cargando} = this.props;
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Icon name="view-sequential" size={40} onPress={() => this.props.navigation.openDrawer()} />
                    <Animatable.View ref={ref => (this.AnimationRef = ref)}>
                        <View style={{ paddingLeft: '80%' }}>
                            <Icon name="reply" size={40} onPress={(event) => this.backDirectory(event)} />
                        </View>
                    </Animatable.View>
                </View>
                {
                    cargando ? <View style={styles.loading}><ActivityIndicator size="large" color="black" animating={true} /></View> : null
                }
                <SafeAreaView >
                    <ScrollView >
                        <View>
                            {
                                paths.map((path) => (
                                    <TouchableOpacity
                                        key={path.nombre}
                                        style={styles.container}
                                        onPress={(event) => this.handleClick(path.ruta, event, path.extension)}>
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
        borderBottomWidth:1
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
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

