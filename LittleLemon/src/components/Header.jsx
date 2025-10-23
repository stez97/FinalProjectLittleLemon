import {View, StyleSheet, Image} from 'react-native';

// Common component for Header of the app.
export default function Header(){
    return(
        <View>
            <Image style={styles.headerImg} source={require('../image/logo.png')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    headerImg: { 
        height: 70,
        width: 500,
        resizeMode: 'contain',
        padding: 10,
        backgroundColor: '#DEE2EB'
    }
});
