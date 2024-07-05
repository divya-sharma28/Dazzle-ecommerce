import { css } from "styled-components";

// GENERAL
export const mobile = (props) =>{
    return css`
    @media only screen and (max-width: 430px){
        ${props}
    }
    `
}
export const tablet = (props) =>{
    return css`
    @media only screen and (min-width: 431px) and (max-width: 835px){
        ${props}
    }
    `
}

export const mobileSmall = (props) =>{
    return css`
    @media only screen and (max-width: 320px){
        ${props}
    }
    `
}

export const mobileMedium = (props) =>{
    return css`
    @media only screen and (min-width: 321px)and (max-width: 380px){
        ${props}
    }
    `
}
export const mobileLarge = (props) =>{
    return css`
    @media only screen and (min-width: 381px)and (max-width: 430px){
        ${props}
    }
    `
}


