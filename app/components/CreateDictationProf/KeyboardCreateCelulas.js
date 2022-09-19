import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import { ListItem, Icon, Slider, Button, Divider, Input } from 'react-native-elements';


export default function KeyboardCreateCelulas(props) {
    const {figuras, setFiguras} = props;
    
        const figuraImagen = [
            {
            name: '64',
            src: require('../../../assets/64.png'),
            },
            {
            name: '32',
            src: require('../../../assets/32.png'),
            },
            {
              name: '16S',
              src: require('../../../assets/16S.png'),
            },
            {
            name: '32S',
            src: require('../../../assets/32S.png'),
            },
            {
            name: '64S',
            src: require('../../../assets/64S.png'),
            },
            {
            name: 'd1S',
            src: require('../../../assets/d1S.png'),
            },
            {
            name: 'd2S',
            src: require('../../../assets/d2S.png'),
            },
            {
            name: 'd4S',
            src: require('../../../assets/d4S.png'),
            },
            {
            name: 'd8S',
            src: require('../../../assets/d8S.png'),
            },
            {
            name: 'd16S',
            src: require('../../../assets/d16S.png'),
            },
          ];
          
    const tienenIcono = [
        '1',
        '2',
        '4',
        '8','16',
        //compuestas
        'd1','d2','d4','d8','d16',
        // silencios
        '1S',
        '2S',
        '4S',
        '8S',
    ]
    const figuresKeyboard = [
        '1',
        '2',
        '4',
        '8','16','32','64',
        //compuestas
        'd1','d2','d4','d8','d16',
        // silencios
        '1S',
        '2S',
        '4S',
        '8S',
        '16S',
        '32S',
        '64S', 
        // Silencios compuestos
        'd1S',
        'd2S',
        'd4S',
        'd8S',
        'd16S'
    ];
    const getImageFigura = (elem) =>{
        const res = figuraImagen.find((e)=>e.name == elem)
        return res.src;
    }

    const getNameIcon = (f) =>{
        switch (f) {
            case '1':
               return ('music-note-whole');
            case 'd1':
                return ('music-note-whole-dotted');
            case '2':
                return ('music-note-half');
            case 'd2':
                return ('music-note-half-dotted');
            case '4':
                return ('music-note-quarter');
            case 'd4':
                return ('music-note-quarter-dotted');
            case '8':
                return ('music-note-eighth');
            case 'd8':
                return ('music-note-eighth-dotted');
            case '16':
                return ('music-note-sixteenth');
            case 'd16':
                return ('music-note-sixteenth-dotted');
            case '2S':
                return ('music-rest-half');
            case '4S':
                return ('music-rest-quarter');
            case '8S':
                return ('music-rest-eighth');
            case '1S':
                return ('music-rest-whole');
            // case '16S':
            //     return ('16S');
            // case 'd1S': return('d1S');
            // case 'd2S':return('d2S');
            // case 'd4S':return ('d4S');
            // case 'd8S':return ('d8S');
            // case 'd16S':return ('d16S');
        }
    };
    

    const getFigure = (fig) => {
        return (
            getNameIcon(fig)
        );
    };

    const alterar = (nota, alteracion) => {
        return nota.slice(0, 1) + alteracion + nota.slice(1, 2);
    };

    const PrintArray = ({figuras}) => {
        if (figuras.length > 0) {
            return (
                <View style={{flexDirection:'row', width:'80%'}}>
                    
                {figuras.map((elem)=>{ 
                    if (elem != undefined && elem.length>5){
                        return(
                        <Icon
                            name={elem}
                            type="material-community"
                            iconStyle={{ fontSize: 30, marginTop:5 }}
                        />)}
                    else {
                       
                        return(
                            <Image
                            resizeMode={'contain'}
                            source={getImageFigura(elem)}
                            // source={{uri:}}
                            style={{  
                            backgroundColor: 'transparent',
                            width: 50, height: 25, alignSelf:'center',marginTop:7 }}
                        />)
                    }
                })}
            </View>
            )
        }else {return <></>}
    };

    const writeFigura = (figura) => {
            var newNotas = [];
            figuras.forEach((g) => {
                newNotas.push(g);
            });
            newNotas.push(figura);
            setFiguras(newNotas);
    };

    const deleteNote = () => {
        var newFiguras = [];
        for (let i = 0; i < figuras.length - 1; i++) {
            const g = figuras[i];
            newFiguras.push(g);
        }

        setFiguras(newFiguras);
    };

    return (
        <>
            <View style={styles.contentKeyboard}>
                <View style={styles.contentGirosMelodicos}>
                    <Text style={styles.textGirosMelodicos}>
                        <PrintArray figuras={figuras} />
                    </Text>
                </View>
                <View style={styles.contentButtonDelete}>
                    <Button
                        icon={
                            <Icon
                                name="chevron-left-box"
                                type="material-community"
                                color="white"
                            />
                        }
                        containerStyle={styles.buttonDelete}
                        onPress={() => deleteNote()}
                    />
                </View>
            </View>

            <ScrollView horizontal={true}>
                {figuresKeyboard.map((figura, i) => (
                    <View key={i}>
                        { tienenIcono.findIndex((e)=>figura == e) != -1 ?
                        <Button
                            disabled={figuras.length>10}
                             icon={
                                <Icon
                                  name={getNameIcon(figura)}
                                  fontSize={30}
                                  type="material-community"
                                />
                              }
                            title={getNameIcon(figura)? '' : figura}
                            onPress={() => writeFigura(getFigure(figura))}
                            containerStyle={styles.buttonNotes}
                         /> :
                         <Button
                         disabled={figuras.length>10}
                        //  title={getNameIcon(figura)? '' : figura}
                         icon={
                            <Image
                            resizeMode={'contain'}
                            source={getImageFigura(figura)}
                            // source={{uri:}}
                            style={{backgroundColor:'transparent', width: 50, height: 25, alignSelf:'center',marginTop:0 }}
                        />
                         }
                         onPress={() => writeFigura(figura)}
                         containerStyle={styles.buttonNotes}
                      > </Button>  }
                        
                    </View>
                ))}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    contentButtonDelete: {
        paddingTop: 20,
        width: '20%',
    },
    contentKeyboard: {
        flexDirection: 'row',
    },
    buttonDelete: {
        width: 60,
    },
    okGiroMelodico: {
        marginTop: 20,
    },
    titleBottom: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
    },
    buttonNotes: {
        width: 60,
        margin: 2,
    },
    contentGirosMelodicos: {
        flexDirection: 'row',
        alignContent: 'center',
        padding: 20,
        width: '80%',
    },
    textGirosMelodicos: {
        fontSize: 15,
        width: '100%',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        padding: 10,
    },
    textPrioridad: {
        marginLeft: 20,
        textAlign: 'left',
        fontSize: 17,
    },
    contentSlider: {
        paddingLeft: 25,
        paddingRight: 25,
        margin: 10,
    },
});
