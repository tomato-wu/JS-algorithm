function cow(n) {
    if(n <= 3) {
        return n+1
    }
    return cow(n-3) + cow(n-1)
}

console.log(cow(6));

