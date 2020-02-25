import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableHighlight, Alert, Dimensions, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card, Button, List, ListItem } from 'react-native-elements'
import Search from '../search'
import { color } from 'react-native-reanimated';
import { DataTable } from 'react-native-paper';
import { request_remision, request_componentes } from '../../redux/actions/actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";



class Remision extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            tableHead: ['O.T', 'Id Item', 'Item', 'Nro'],
            widthArr: [40, 60, 80, 100],
            tableData: [],
            isModalVisible: false,
            checked: 0,
        };
        this.generarRemision = this.generarRemision.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleModalClose = this.toggleModalClose.bind(this);
    }
    toggleModal(ot, item, nro) {
        this.props.request_componentes(ot, item, nro);
        this.setState({ isModalVisible: true });
    };
    toggleModalClose() {
        this.setState({ isModalVisible: false });
    };
    generarRemision() {
        const { ot, usuario } = this.props;
        this.props.request_remision(ot, usuario.id);
    }
    render() {
        const { header_remision, items_remision, item_componentes } = this.props;
        return (
            <View>
                <Search />
                <Card title={"INFORMACIÓN O.T  " + header_remision.ot} >
                    <Text>
                        <Text style={styles.titulo}>CLIENTE </Text>{header_remision.cliente + '\n'}
                        <Text style={styles.titulo}>RUT </Text>{header_remision.rut + '\n'}
                        <Text style={styles.titulo}>DIRECCION </Text>{header_remision.direccion + '\n'}
                        <Text style={styles.titulo}>CIUDAD </Text>{header_remision.ciudad + '\n'}
                        <Text style={styles.titulo}>CONTACTO </Text>{header_remision.contacto + '\n'}
                        <Text style={styles.titulo}>VENDEDOR </Text>{header_remision.vendedor + '\n'}
                        <Text style={styles.titulo}>ORDEN </Text>{header_remision.orden + '\n'}
                    </Text>
                    <Button
                        icon={<Icon name='clipboard-text-outline' size={25} color='#ffffff' />}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        onPress={this.generarRemision}
                        title=' Generar Remisión' />
                </Card>
                <SafeAreaView >
                    <ScrollView >
                        <View>
                            <DataTable>
                                <DataTable.Header>

                                    <DataTable.Title>ITEM</DataTable.Title>
                                    <DataTable.Title>NRO</DataTable.Title>
                                    <DataTable.Title>O.T</DataTable.Title>
                                    <DataTable.Title>ITEM ID</DataTable.Title>
                                    <DataTable.Title>Realizar</DataTable.Title>
                                </DataTable.Header>
                                {
                                    items_remision.map((row) => (
                                        <DataTable.Row key={row.id}>

                                            <DataTable.Cell>{row.item}</DataTable.Cell>
                                            <DataTable.Cell>{row.nro}</DataTable.Cell>
                                            <DataTable.Cell>{row.ot}</DataTable.Cell>
                                            <DataTable.Cell >{row.id}</DataTable.Cell>
                                            <DataTable.Cell onPress={(event) => this.toggleModal(row.ot, row.item, row.nro)}>  <Icon name='border-color' size={25} color='green' /></DataTable.Cell>
                                        </DataTable.Row>
                                    ))
                                }
                            </DataTable>
                            <Modal
                                animationType="slide"
                                transparent={false}
                                visible={this.state.isModalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                }}>
                                <SafeAreaView >
                                    <ScrollView >
                                        <View>
                                            <View>
                                                <Text>LISTA DE COMPONENTES</Text>
                                                {
                                                    item_componentes.map((l) => (
                                                        <ListItem
                                                            checkBox={{ // CheckBox Props
                                                                iconType: 'material',
                                                                checkedIcon: 'done',
                                                                uncheckedIcon: 'clear',
                                                                checkedColor: 'green',
                                                                uncheckedColor: 'red',
                                                                onPress: () => {alert('hola')},
                                                                checked: this.state.checked,
                                                            }}
                                                            key={l.id}
                                                            title={l.descripcion}
                                                        />
                                                    ))
                                                }
                                                <Button
                                                    icon={<Icon name='checkbox-marked-circle-outline' size={25} color='#ffffff' />}
                                                    onPress={this.toggleModalClose}
                                                    title=' Finalizar' />
                                            </View>
                                        </View>
                                    </ScrollView>
                                </SafeAreaView>
                            </Modal>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    titulo: {
        color: 'green',
        fontWeight: 'bold',
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});

const mapStateToProps = (state) => {
    return {
        message: state.userRedux.message,
        usuario: state.userRedux.usuario,
        ot: state.userRedux.ot,
        header_remision: state.userRedux.header_remision,
        items_remision: state.userRedux.items_remision,
        item_componentes: state.userRedux.item_componentes,
    };
}
const mapDispatchToProps = {
    request_remision,
    request_componentes,
}
export default connect(mapStateToProps, mapDispatchToProps)(Remision);