import React from 'react';
import styles from './ProductPage.module.scss';
import {FavoriteIconFilled, FavoriteIconNotFilled} from './icons'

export default function FavorisIcon ( { isFilled, onClick } ) {

    return (
        <div className={styles.favorisIconDetail} onClick={onClick}>
            {isFilled ? (
                <FavoriteIconFilled />
            ) : (
                <FavoriteIconNotFilled />
            )}
        </div>
    );
};


