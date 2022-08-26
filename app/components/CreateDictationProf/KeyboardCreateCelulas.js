import React from 'react';
import { StyleSheet, ScrollView, View, Text, Animated } from 'react-native';
import { ListItem, Icon, Slider, Button, Divider, Input } from 'react-native-elements';


export default function KeyboardCreateCelulas(props) {
    const {figuras, setFiguras} = props;
    const figuresKeyboard = [
        '1',
        '2',
        '4',
        '8','16',
        // '32','64',
        'd1','d2','d4','d8','d16',
        's1','s2','s4','s8'
    ];

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
            case 's2':
                return ('music-rest-half');
            case 's4':
                return ('music-rest-quarter');
            case 's8':
                return ('music-rest-eighth');
            case 's1':
                return ('music-rest-whole');
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
                    if (elem != undefined){
                        return(
                        <Icon
                            name={elem}
                            type="material-community"
                            iconStyle={{ fontSize: 30, marginTop:5 }}
                        />)}
                    else return(
                        <Text>{elem}</Text>)
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
                         />
                        
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
