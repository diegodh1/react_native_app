import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Card, Button, CheckBox} from 'react-native-elements';
import Search from '../search';
import {color} from 'react-native-reanimated';
import {DataTable} from 'react-native-paper';
import {
  request_remision,
  search_remision,
  request,
  receive,
} from '../../redux/actions/actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {List} from 'react-native-paper';
import {PacmanIndicator} from 'react-native-indicators';

class Remision extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      tableData: [],
      isModalVisible: false,
      checked: 0,
      nroIntem: '',
      obs: '',
      components_obs: [],
      cambios: [],
      nro_item: '',
    };
    this.generarRemision = this.generarRemision.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
    this.saveComponente = this.saveComponente.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeCant = this.onChangeCant.bind(this);
    this.searchRemision = this.searchRemision.bind(this);
  }
  onChangeText(id, obsInput) {
    let {components_obs} = this.state;
    for (let i = 0; i < components_obs.length; i++) {
      if (components_obs[i].id === id) {
        components_obs[i].obs = obsInput;
      }
    }
    this.setState({components_obs: components_obs});
  }
  onChangeCant(id, cantidad) {
    let {components_obs} = this.state;
    for (let i = 0; i < components_obs.length; i++) {
      if (components_obs[i].id === id) {
        components_obs[i].cantidad = cantidad;
      }
    }
    this.setState({components_obs: components_obs});
  }
  toggleModal(ot, item, nro, id_sub_item) {
    this.props.request();
    this.setState({
      isModalVisible: true,
      nroIntem: item,
      cambios: [],
      nro_item: 'Ultimo item #' + item + ' tablero # ' + nro,
    });
    fetch('http://192.168.0.21:4000/getComponentes', {
      method: 'POST',
      body: JSON.stringify({
        ot: ot,
        item: item,
        nro: nro,
        id_sub_item: id_sub_item,
      }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(response => {
        this.setState({components_obs: response.data});
        this.props.receive();
      })
      .catch(error => {
        this.setState({components_obs: []});
        this.props.receive();
      });
  }
  toggleModalClose() {
    this.setState({isModalVisible: false});
    this.saveComponente();
  }
  searchRemision(id_rem) {
    this.props.search_remision(id_rem);
  }
  generarRemision() {
    const {ot, usuario} = this.props;
    this.props.request_remision(ot, usuario.id);
  }
  saveComponente() {
    this.props.request();
    const {cambios} = this.state;
    const {usuario} = this.props;
    for (let i = 0; i < cambios.length; i++) {
      cambios[i].id_usuario = usuario.id;
    }
    fetch('http://192.168.0.21:4000/saveComponente', {
      method: 'POST',
      body: JSON.stringify({cambios: cambios}), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(response => {
        console.log(JSON.stringify(cambios[i]));
        this.props.receive();
      })
      .catch(error => {
        console.log(error);
        this.props.receive();
      });
  }
  store_changes(
    id_sub_item,
    id_componente,
    requerida,
    compte_cant,
    compte_obs,
    ot,
    item,
    nro,
  ) {
    let temp = this.state.components_obs;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id === id_componente) {
        temp[i].requerida = !requerida;
      }
    }
    this.setState({components_obs: temp});
    this.guardarCambios(
      id_sub_item,
      id_componente,
      requerida,
      compte_cant,
      compte_obs,
      ot,
      item,
      nro,
    );
  }
  guardarCambios(
    id_sub_item,
    id_componente,
    requerida,
    compte_cant,
    compte_obs,
    ot,
    item,
    nro,
  ) {
    let esta = false;
    let cambiosTemp = this.state.cambios;
    for (let i = 0; i < cambiosTemp.length; i++) {
      if (cambiosTemp[i].id === id_componente) {
        cambiosTemp[i].requerida = !requerida;
        esta = true;
      }
    }
    if (!esta) {
      cambiosTemp.push({
        id_sub_item: id_sub_item,
        id_componente: id_componente,
        requerida: !requerida,
        compte_cant: compte_cant,
        compte_obs: compte_obs,
        ot: ot,
        item: item,
        nro: nro,
      });
    }
    this.setState({cambios: cambiosTemp});
  }
  render() {
    const {header_remision, items_remision, cargando, id_remision} = this.props;
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <Search />
            <Card
              title={
                <View style={{backgroundColor: 'green'}}>
                  <Text style={{textAlign: 'center', color: 'white'}}>
                    O.T {header_remision.ot} REMISIÓN # {id_remision}
                  </Text>
                </View>
              }>
              <Text>
                <Text style={styles.titulo}>CLIENTE </Text>
                {header_remision.cliente + '\n'}
                <Text style={styles.titulo}>RUT </Text>
                {header_remision.rut + '\n'}
                <Text style={styles.titulo}>DIRECCION </Text>
                {header_remision.direccion + '\n'}
                <Text style={styles.titulo}>CIUDAD </Text>
                {header_remision.ciudad + '\n'}
                <Text style={styles.titulo}>CONTACTO </Text>
                {header_remision.contacto + '\n'}
                <Text style={styles.titulo}>VENDEDOR </Text>
                {header_remision.vendedor + '\n'}
                <Text style={styles.titulo}>ORDEN </Text>
                {header_remision.orden + '\n'}
              </Text>
              <Button
                icon={
                  <Icon
                    name="clipboard-text-outline"
                    size={25}
                    color="#ffffff"
                  />
                }
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  backgroundColor: '#6566FF',
                }}
                onPress={this.generarRemision}
                title=" Generar Remisión"
              />
            </Card>
            <View>
              <ScrollView horizontal={true}>
                {header_remision.remisiones.map(row => (
                  <Card title={'REMISIÓN # ' + row.id}>
                    <Text>{row.fecha_crea + '\n'}</Text>
                    <Button
                      title="Revisar"
                      buttonStyle={{backgroundColor: '#6566FF'}}
                      onPress={() => this.searchRemision(row.id)}
                    />
                  </Card>
                ))}
              </ScrollView>
            </View>
            <View>
              {cargando ? (
                <View>
                  <PacmanIndicator color="green" />
                </View>
              ) : (
                <View style={{marginTop: '3%'}}>
                  <Text style={{textAlign: 'center'}}>
                    {this.state.nro_item}
                  </Text>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>ITEM</DataTable.Title>
                      <DataTable.Title>NRO</DataTable.Title>
                      <DataTable.Title>O.T</DataTable.Title>
                      <DataTable.Title>Realizar</DataTable.Title>
                    </DataTable.Header>
                    {items_remision.map(row => (
                      <DataTable.Row key={row.id}>
                        <DataTable.Cell>{row.item}</DataTable.Cell>
                        <DataTable.Cell>{row.nro}</DataTable.Cell>
                        <DataTable.Cell>{row.ot}</DataTable.Cell>
                        <DataTable.Cell
                          onPress={event =>
                            this.toggleModal(row.ot, row.item, row.nro, row.id)
                          }>
                          {' '}
                          <Icon name="border-color" size={30} color="green" />
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                </View>
              )}
            </View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.isModalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <SafeAreaView>
                <ScrollView>
                  <View>
                    {cargando ? (
                      <View>
                        <PacmanIndicator color="green" />
                      </View>
                    ) : (
                      <View>
                        <Text>
                          LISTA DE COMPONENTES DEL ITEM {this.state.nroIntem}
                        </Text>
                        {this.state.components_obs.map(l => (
                          <Card title={'Componente Id: ' + l.id_aux} key={l.id}>
                            <CheckBox
                              center
                              title="Utilizar"
                              checked={l.requerida}
                              onPress={() =>
                                this.store_changes(
                                  l.id_sub_item,
                                  l.id,
                                  l.requerida,
                                  l.cantidad,
                                  l.obs,
                                  l.ot,
                                  l.item,
                                  l.nro,
                                )
                              }
                            />
                            <Text>{l.descripcion + '\n'}</Text>
                            <View>
                              <TextInput
                                placeholder="Ingresar Cantidad"
                                underlineColorAndroid="transparent"
                                style={{borderWidth: 0.5, borderRadius: 1}}
                                value={l.cantidad}
                                onChangeText={text =>
                                  this.onChangeCant(l.id, text)
                                }
                              />
                            </View>
                            <TextInput
                              placeholder="Ingresar Observación"
                              style={{
                                backgroundColor: '#F1F4BE',
                                borderWidth: 0.5,
                                borderRadius: 1,
                              }}
                              multiline={true}
                              numberOfLines={1}
                              onChangeText={text =>
                                this.onChangeText(l.id, text)
                              }
                              value={l.obs}
                            />
                          </Card>
                        ))}
                        <Button
                          icon={
                            <Icon
                              name="checkbox-marked-circle-outline"
                              size={25}
                              color="#ffffff"
                            />
                          }
                          onPress={this.toggleModalClose}
                          buttonStyle={{
                            borderRadius: 0,
                            marginLeft: 0,
                            marginRight: 0,
                            marginBottom: 0,
                            backgroundColor: '#6566FF',
                          }}
                          title=" Finalizar"
                        />
                      </View>
                    )}
                  </View>
                </ScrollView>
              </SafeAreaView>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  titulo: {
    color: 'green',
    fontWeight: 'bold',
  },
  view: {
    flexDirection: 'row',
  },
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    message: state.userRedux.message,
    usuario: state.userRedux.usuario,
    ot: state.userRedux.ot,
    header_remision: state.userRedux.header_remision,
    items_remision: state.userRedux.items_remision,
    item_componentes: state.userRedux.item_componentes,
    cargando: state.userRedux.cargando,
    id_remision: state.userRedux.id_remision,
  };
};
const mapDispatchToProps = {
  request_remision,
  search_remision,
  request,
  receive,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Remision);
