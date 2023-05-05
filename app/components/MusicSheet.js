import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MusicSheet(props) {
    const { dictation } = props;
    console.log(dictation);

    

    return (
        <WebView
            source={{ html: '<div><p>Hola mundo...</p></div>' }}
            style={{
                marginLeft: 1100,
                width: 1500, // aumentando este ancho logro aumentar el taman;o de las figuras
            }}
            showsHorizontalScrollIndicator={false}
        />
    );
}
