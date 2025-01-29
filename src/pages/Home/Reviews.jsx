import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const reviews = [
    {
        id: 1,
        name: 'John Doe',
        location: 'New York, USA',
        rating: 5,
        photo: 'https://via.placeholder.com/150',
        review: 'This was an amazing experience! Highly recommend to everyone.'
    },
    {
        id: 2,
        name: 'Jane Smith',
        location: 'London, UK',
        rating: 4,
        photo: 'https://via.placeholder.com/150',
        review: 'Great service and friendly staff. Will definitely come back.'
    },
    {
        id: 3,
        name: 'Carlos Garcia',
        location: 'Madrid, Spain',
        rating: 5,
        photo: 'https://via.placeholder.com/150',
        review: 'A wonderful adventure from start to finish!'
    }
];

const Reviews = () => {
    return (
        <div className="reviews-section">
            <h2>Loved by Travelers Worldwide</h2>
            <Carousel>
                {reviews.map(review => (
                    <Carousel.Item key={review.id}>
                        <div className="review">
                            <img src={review.photo} alt={review.name} className="review-photo" />
                            <h3>{review.name}</h3>
                            <p>{review.location}</p>
                            <div className="rating">
                                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                            </div>
                            <p>{review.review}</p>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default Reviews;