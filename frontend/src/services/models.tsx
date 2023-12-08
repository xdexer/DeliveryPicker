interface Promotion {
    id: number,
    details: string,
    valid_until: string
}

interface Location {
    id: number,
    street: string,
    city: string,
    latitude: string,
    longtitude: string
}

interface Cuisine {
    id: number,
    name: string
}

interface Restaurant {
    id: number,
    name: string,
    promotion_id: Promotion,
    location_id: Location
}


interface RestaurantDetails {
    id: number,
    name: string,
    promotion_id: Promotion,
    cuisine_id: Array<Cuisine>,
    location_id: Location
}

interface DeliveryPicker {
    name: string,
    promotion_id: Promotion,
    delivery_cost: number,
    service_cost: number
}

export type { Cuisine, DeliveryPicker, Location, Promotion, Restaurant, RestaurantDetails }
