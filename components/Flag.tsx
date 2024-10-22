import {  Image } from 'react-native';
import styles from '@/assets/style';

export function Flag({ flag = '' }) {

  return (
    <>
      { flag === 'AL' && <Image source={require("@/assets/images/flags/AL.png")} style={[styles.flag]} />}
      { flag === 'AK' && <Image source={require("@/assets/images/flags/AK.png")} style={[styles.flag]} />}
      { flag === 'AZ' && <Image source={require("@/assets/images/flags/AZ.png")} style={[styles.flag]} />}
      { flag === 'AR' && <Image source={require("@/assets/images/flags/AR.png")} style={[styles.flag]} />}
      { flag === 'CA' && <Image source={require("@/assets/images/flags/CA.png")} style={[styles.flag]} />}
      { flag === 'CO' && <Image source={require("@/assets/images/flags/CO.png")} style={[styles.flag]} />}
      { flag === 'CT' && <Image source={require("@/assets/images/flags/CT.png")} style={[styles.flag]} />}
      { flag === 'DE' && <Image source={require("@/assets/images/flags/DE.png")} style={[styles.flag]} />}
      { flag === 'FL' && <Image source={require("@/assets/images/flags/FL.png")} style={[styles.flag]} />}
      { flag === 'GA' && <Image source={require("@/assets/images/flags/GA.png")} style={[styles.flag]} />}
      { flag === 'HI' && <Image source={require("@/assets/images/flags/HI.png")} style={[styles.flag]} />}
      { flag === 'ID' && <Image source={require("@/assets/images/flags/ID.png")} style={[styles.flag]} />}
      { flag === 'IL' && <Image source={require("@/assets/images/flags/IL.png")} style={[styles.flag]} />}
      { flag === 'IN' && <Image source={require("@/assets/images/flags/IN.png")} style={[styles.flag]} />}
      { flag === 'IA' && <Image source={require("@/assets/images/flags/IA.png")} style={[styles.flag]} />}
      { flag === 'KS' && <Image source={require("@/assets/images/flags/KS.png")} style={[styles.flag]} /> }
      { flag === 'KY' && <Image source={require("@/assets/images/flags/KY.png")} style={[styles.flag]} /> }
      { flag === 'LA' && <Image source={require("@/assets/images/flags/LA.png")} style={[styles.flag]} /> }
      { flag === 'ME' && <Image source={require("@/assets/images/flags/ME.png")} style={[styles.flag]} /> }
      { flag === 'MD' && <Image source={require("@/assets/images/flags/MD.png")} style={[styles.flag]} /> }
      { flag === 'MA' && <Image source={require("@/assets/images/flags/MA.png")} style={[styles.flag]} /> }
      { flag === 'MI' && <Image source={require("@/assets/images/flags/MI.png")} style={[styles.flag]} /> }
      { flag === 'MN' && <Image source={require("@/assets/images/flags/MN.png")} style={[styles.flag]} /> }
      { flag === 'MS' && <Image source={require("@/assets/images/flags/MS.png")} style={[styles.flag]} /> }
      { flag === 'MO' && <Image source={require("@/assets/images/flags/MO.png")} style={[styles.flag]} /> }
      { flag === 'MT' && <Image source={require("@/assets/images/flags/MT.png")} style={[styles.flag]} /> }
      { flag === 'NE' && <Image source={require("@/assets/images/flags/NE.png")} style={[styles.flag]} /> }
      { flag === 'NV' && <Image source={require("@/assets/images/flags/NV.png")} style={[styles.flag]} /> }
      { flag === 'NH' && <Image source={require("@/assets/images/flags/NH.png")} style={[styles.flag]} /> }
      { flag === 'NJ' && <Image source={require("@/assets/images/flags/NJ.png")} style={[styles.flag]} /> }
      { flag === 'NM' && <Image source={require("@/assets/images/flags/NM.png")} style={[styles.flag]} /> }
      { flag === 'NY' && <Image source={require("@/assets/images/flags/NY.png")} style={[styles.flag]} /> }
      { flag === 'NC' && <Image source={require("@/assets/images/flags/NC.png")} style={[styles.flag]} /> }
      { flag === 'ND' && <Image source={require("@/assets/images/flags/ND.png")} style={[styles.flag]} /> }
      { flag === 'OH' && <Image source={require("@/assets/images/flags/OH.png")} style={[styles.flag]} /> }
      { flag === 'OK' && <Image source={require("@/assets/images/flags/OK.png")} style={[styles.flag]} /> }
      { flag === 'OR' && <Image source={require("@/assets/images/flags/OR.png")} style={[styles.flag]} /> }
      { flag === 'PA' && <Image source={require("@/assets/images/flags/PA.png")} style={[styles.flag]} /> }
      { flag === 'RI' && <Image source={require("@/assets/images/flags/RI.png")} style={[styles.flag]} /> }
      { flag === 'SC' && <Image source={require("@/assets/images/flags/SC.png")} style={[styles.flag]} /> }
      { flag === 'SD' && <Image source={require("@/assets/images/flags/SD.png")} style={[styles.flag]} /> }
      { flag === 'TN' && <Image source={require("@/assets/images/flags/TN.png")} style={[styles.flag]} /> }
      { flag === 'TX' && <Image source={require("@/assets/images/flags/TX.png")} style={[styles.flag]} /> }
      { flag === 'UT' && <Image source={require("@/assets/images/flags/UT.png")} style={[styles.flag]} /> }
      { flag === 'VT' && <Image source={require("@/assets/images/flags/VT.png")} style={[styles.flag]} /> }
      { flag === 'VA' && <Image source={require("@/assets/images/flags/VA.png")} style={[styles.flag]} /> }
      { flag === 'WA' && <Image source={require("@/assets/images/flags/WA.png")} style={[styles.flag]} /> }
      { flag === 'WV' && <Image source={require("@/assets/images/flags/WV.png")} style={[styles.flag]} /> }
      { flag === 'WI' && <Image source={require("@/assets/images/flags/WI.png")} style={[styles.flag]} /> }
      { flag === 'WY' && <Image source={require("@/assets/images/flags/WY.png")} style={[styles.flag]} /> }
      { flag === 'DC' && <Image source={require("@/assets/images/flags/DC.png")} style={[styles.flag]} /> }
      { flag === 'AS' && <Image source={require("@/assets/images/flags/AS.png")} style={[styles.flag]} /> }
      { flag === 'GU' && <Image source={require("@/assets/images/flags/GU.png")} style={[styles.flag]} /> }
      { flag === 'MP' && <Image source={require("@/assets/images/flags/MP.png")} style={[styles.flag]} /> }
      { flag === 'PR' && <Image source={require("@/assets/images/flags/PR.png")} style={[styles.flag]} /> }
      { flag === 'JA-UM' && <Image source={require("@/assets/images/flags/JA-UM.gif")} style={[styles.flag]} /> }
      { flag === 'MI-UM' && <Image source={require("@/assets/images/flags/MI-UM.png")} style={[styles.flag]} /> }
      { flag === 'WI-UM' && <Image source={require("@/assets/images/flags/WI-UM.png")} style={[styles.flag]} /> }
      { flag === 'VI' && <Image source={require("@/assets/images/flags/VI.png")} style={[styles.flag]} /> }
    </>
  );
}
