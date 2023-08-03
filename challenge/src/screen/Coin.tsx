import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Header, Loading, Title, Wrapper } from "./style/CoinsStyle";
import { IRouteState } from "./types/CoinsType";
import axios from "axios";
import { ICoinDetail, ICoinPrice } from "./types/CoinType";
import {
    Board,
    Container,
    Description,
    Information,
    SubItems,
} from "./style/CoinStyle";

const COIN_DETAIL_URL = "https://api.coinpaprika.com/v1/coins/";
const COIN_PRICE_URL = "https://api.coinpaprika.com/v1/tickers/";

function Coin() {
    const { coinId } = useParams<{ coinId: string }>();
    const { state } = useLocation<IRouteState>();

    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState<ICoinDetail>();
    const [price, setPrice] = useState<ICoinPrice>();

    async function getCoinDetail(coinId: string) {
        const response = await axios.get(COIN_DETAIL_URL + coinId);
        setDetail(response.data);
    }

    async function getCoinPrice(coinId: string) {
        const response = await axios.get(COIN_PRICE_URL + coinId);
        setPrice(response.data);
    }

    useEffect(() => {
        if (state) {
            setLoading(false);
        }

        getCoinDetail(coinId);
        getCoinPrice(coinId);
    }, [coinId]);

    return (
        <Wrapper>
            <Header>
                <Title>{state?.name || "Not Exist"}</Title>
            </Header>

            {loading ? (
                <Loading>Loading...</Loading>
            ) : (
                <Container>
                    <Information>
                        <Board>
                            <SubItems>
                                <p>RANK</p>
                                <p>{detail?.rank}</p>
                            </SubItems>
                            <SubItems>
                                <p>SYMBOL</p>
                                <p>{detail?.symbol}</p>
                            </SubItems>
                            <SubItems>
                                <p>TYPE</p>
                                <p>{detail?.type}</p>
                            </SubItems>
                        </Board>
                        <Description>{detail?.description}</Description>
                        <Board>
                            <SubItems>
                                <p>MAX SUPPLY</p>
                                <p>{price?.max_supply}</p>
                            </SubItems>
                            <SubItems>
                                <p>CIRCULATING SUPPLY</p>
                                <p>{price?.circulating_supply}</p>
                            </SubItems>
                            <SubItems>
                                <p>TOTAL SUPPLY</p>
                                <p>{price?.total_supply}</p>
                            </SubItems>
                        </Board>
                    </Information>
                </Container>
            )}
        </Wrapper>
    );
}

export default React.memo(Coin);
