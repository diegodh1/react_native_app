import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestPaths } from '../../redux/actions/actions';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import ImageZoom from 'react-native-image-pan-zoom';
import Pdf from 'react-native-pdf';

class Frame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
        };
    }
    render() {
        const { usuario, encoded64, extension } = this.props;
        return (
            <View>
                <Icon name="view-sequential" size={40} onPress={() => this.props.navigation.openDrawer()} />
                <FrameItem ext={extension} encoded64={encoded64} />
            </View>
        );
    }
}

let FrameItem = props => {
    const { ext, encoded64 } = props;
    if (ext.toLocaleLowerCase() === 'pdf') {
        let source = 'data:application/pdf;base64,'+encoded64;
        return (<Text >Bienvenid@</Text>)
    }
    else if (ext === '') {
        return (<Text >Bienvenid@</Text>)
    }
    else {
        let src = 'data:image/' + ext + ';base64,' + encoded64;
        return (
            <View style={{margin:10}}>
            <ImageZoom cropWidth={Dimensions.get('window').width}
                cropHeight={Dimensions.get('window').height}
                imageWidth={Dimensions.get('window').width}
                imageHeight={Dimensions.get('window').height}
                >
                <Image
                    style={{ width: '90%', height: '90%', borderWidth: 1, borderColor: 'red' }}
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
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
})

const mapStateToProps = (state) => {
    return {
        usuario: state.userRedux.usuario,
        encoded64: state.userRedux.encoded64,
        extension: state.userRedux.extension,
    };
}
const mapDispatchToProps = {
    requestPaths,
}
export default connect(mapStateToProps, mapDispatchToProps)(Frame);

