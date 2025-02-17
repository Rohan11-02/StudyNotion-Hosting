export default function GetAvgRating(ratingArr){
    if(ratingArr?.length === 0){
        return 0;
    }

    const totalRatingCount = ratingArr?.reduce((acc, curr) => (acc + curr.rating), 0);

    const multiplier = Math.pow(10, 1);
    const avgRatingCount = Math.round((totalRatingCount / ratingArr?.length) * multiplier)
                                                                         / multiplier;

    return avgRatingCount;                                                                     
}