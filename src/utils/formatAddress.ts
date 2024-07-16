function formatAddress(address: string) {
        const firstFour = address.substring(0, 4);
        const lastFour = address.substring(address.length - 4);
        return `${firstFour}...${lastFour}`;
}

export default formatAddress