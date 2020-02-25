import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card, Button } from 'react-native-elements'
import Search from '../search'
import { color } from 'react-native-reanimated';
import { DataTable } from 'react-native-paper';
import { request_remision } from '../../redux/actions/actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




class Remision extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            tableHead: ['O.T', 'Id Item', 'Item', 'Nro'],
            widthArr: [40, 60, 80, 100],
            tableData: [],
        };
        this.generarRemision = this.generarRemision.bind(this);
    }
    generarRemision() {
        const { ot, usuario } = this.props;
        this.props.request_remision(ot, usuario.id);
    }
    render() {
        const { header_remision, items_remision } = this.props;
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
                        icon={<Icon name='checkbox-marked-circle-outline' size={25} color='#ffffff' />}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        onPress={this.generarRemision}
                        title=' Generar Remisión' />
                </Card>
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
                                    <DataTable.Cell>  <Icon name='border-color' size={25} color='green' /></DataTable.Cell>
                                </DataTable.Row>
                            ))
                        }
                    </DataTable>
                </View>
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
        items_remision: state.userRedux.items_remision
    };
}
const mapDispatchToProps = {
    request_remision,
}
export default connect(mapStateToProps, mapDispatchToProps)(Remision);