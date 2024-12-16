import styles from "../css/MainPage.module.css";
import Canvas from "./Canvas.jsx";
import RSelector from "./RSelector.jsx";
import MyTable from "./MyTable.jsx";

export function CanvasPage() {

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <Canvas/>
                <RSelector/>
            </div>
            <div className={styles.item}>
                <MyTable/>
            </div>
            <div className={styles.item}>
                <h1> ЗДЕСЬ МОГЛА БЫТЬ ВАША РЕКЛАМА</h1>
            </div>
        </div>
    );
}
