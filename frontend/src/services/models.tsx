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

interface DeliveryPicker {
    id: number,
    restaurant_id: Restaurant,
    promotion_id: Promotion,
    name: string,
    phone_number: string,
    delivery_cost: number,
    service_cost: number,
    resource_url: string
}

export type { Cuisine, DeliveryPicker, Location, Promotion, Restaurant }
