export interface Car {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
}

export interface Truck {
  id: string;
  modelName: string;
  type: string;
  engineType: string;
  payload: string;
  imageUrl: string;
}

export interface Bus {
  id: string;
  modelName: string;
  type: string;
  capacity: string;
  engineType: string;
  imageUrl: string;
}

export interface Launches {
  id: string;
  modelName: string;
  bodyType?: string;
  modelType?: string;
  type?: string;
  imageUrl: string;
}

export interface News {
  tag: string;
  date: string;
  title: string;
  description: string;
  image: string;
}
