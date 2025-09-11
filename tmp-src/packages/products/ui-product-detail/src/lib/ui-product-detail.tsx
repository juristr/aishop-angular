import styles from './ui-product-detail.module.css';
import { Ui } from '@aishop/ui';

export function UiProductDetail() {
  return (
    <div className={styles['container']}>
      <h1>Welcome to UiProductDetail!</h1>
      <Ui />
    </div>
  );
}

export default UiProductDetail;
