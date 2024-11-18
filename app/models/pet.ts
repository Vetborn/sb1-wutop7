export interface Pet {
    name: string;
    breed: string;
    age: number;
    sex: 'male' | 'female';
    size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    temperament: string[];
}

export const PetSizes = [
    { id: 'xsmall', label: 'X-Small 0 - 10 lb' },
    { id: 'small', label: 'Small 11 - 20 lb' },
    { id: 'medium', label: 'Medium 21 - 50 lb' },
    { id: 'large', label: 'Large 51 - 90 lb' },
    { id: 'xlarge', label: 'XLarge up to 90 lb' }
];

export const PetTemperaments = [
    { id: 'friendly', label: 'Friendly' },
    { id: 'shy', label: 'Shy' },
    { id: 'energetic', label: 'Energetic' },
    { id: 'calm', label: 'Calm' },
    { id: 'aggressive', label: 'Aggressive' },
    { id: 'anxious', label: 'Anxious' },
    { id: 'protective', label: 'Protective' },
    { id: 'playful', label: 'Playful' }
];