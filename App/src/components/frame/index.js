import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestPaths } from '../../redux/actions/actions';
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import ImageZoom from 'react-native-image-pan-zoom';
import Pdf from 'react-native-pdf';
import {
    PacmanIndicator,
} from 'react-native-indicators';
import { Header } from 'react-native-elements';

class Frame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
        };
        this.backHome = this.backHome.bind(this);
    }
    backHome() {
        this.props.navigation.navigate('Lista')
    }
    render() {
        const { usuario, encoded64, extension, cargando } = this.props;
        return (
            <View>
                {
                    cargando ? <View style={styles.loading}><PacmanIndicator color="green" /></View> :
                        < View >
                            <Header
                                containerStyle={{
                                    backgroundColor: '#6566FF',
                                    justifyContent: 'space-around'
                                }}
                                leftComponent={<Icon color="white" name="view-sequential" size={40} onPress={() => this.props.navigation.openDrawer()} />}
                                rightComponent={<Icon name="reply" color="white" size={40} onPress={() => this.backHome()} />}
                            />

                            <FrameItem ext={extension} encoded64={encoded64} />
                        </View>
                }
            </View>
        );
    }
}

let FrameItem = props => {
    const { ext, encoded64 } = props;
    if (ext.toLocaleLowerCase() === 'pdf') {
        let source = { uri: "data:application/pdf;base64," + encoded64 };
        return (
            <View style={styles.container}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages, filePath) => {
                    }}
                    style={styles.pdf} />
            </View>
        )
    }
    else if (ext === '') {
        return (<Text >Bienvenid@</Text>)
    }
    else {
        let src = 'data:image/' + ext + ';base64,' + encoded64;
        return (
            <View >
                <ImageZoom cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={700}
                    imageHeight={800}
                >
                    <Image
                        style={{ width: '100%', height: '100%', borderWidth: 1, borderColor: 'black' }}
                        source={{ uri: src }}
                    />
                </ImageZoom>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
    },
    container: {
        alignItems: 'center',
        margin: 10,
    },
    pdf: {
        width: '95%',
        height: '95%',
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        marginTop:'50%',
        top: 0,
        bottom: 0,
    }
})

const mapStateToProps = (state) => {
    return {
        usuario: state.userRedux.usuario,
        encoded64: state.userRedux.encoded64,
        extension: state.userRedux.extension,
        cargando: state.userRedux.cargando,
    };
}
const mapDispatchToProps = {
    requestPaths,
}
export default connect(mapStateToProps, mapDispatchToProps)(Frame);

