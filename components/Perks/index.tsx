import React, { FC } from 'react';
import { Container } from '../craft';

interface PerksProps {

}

const Perks: FC<PerksProps> = ({ }) => {
    return (
        <div className="perks pt-16 pb-16 bg-gray-50 dark:bg-dark border-t border-b">
            <Container className="max-w-6xl">
                <p className="text-3xl text-center">Some of our perks</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    <div className="bg-white dark:bg-dark shadow-lg p-6 rounded-xl relative overflow-hidden group hover:border-0 transition-all duration-300 hover:-translate-y-1 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-pink before:transition-all before:duration-500 before:ease-out hover:before:w-full dark:border">
                        <p className="text-xl font-semibold mb-4">
                            Lorem ipsum
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor esse dignissimos sed vero delectus
                        </p>
                    </div>
                     <div className="bg-white dark:bg-dark shadow-lg p-6 rounded-xl relative overflow-hidden group hover:border-0 transition-all duration-300 hover:-translate-y-1 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-pink before:transition-all before:duration-500 before:ease-out hover:before:w-full dark:border">
                        <p className="text-xl font-semibold mb-4">
                            Lorem ipsum
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor esse dignissimos sed vero delectus
                        </p>
                    </div>
                     <div className="bg-white dark:bg-dark shadow-lg p-6 rounded-xl relative overflow-hidden group hover:border-0 transition-all duration-300 hover:-translate-y-1 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-pink before:transition-all before:duration-500 before:ease-out hover:before:w-full dark:border">
                        <p className="text-xl font-semibold mb-4">
                            Lorem ipsum
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor esse dignissimos sed vero delectus
                        </p>
                    </div>
                     <div className="bg-white dark:bg-dark shadow-lg p-6 rounded-xl relative overflow-hidden group hover:border-0 transition-all duration-300 hover:-translate-y-1 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-pink before:transition-all before:duration-500 before:ease-out hover:before:w-full dark:border">
                        <p className="text-xl font-semibold mb-4">
                            Lorem ipsum
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor esse dignissimos sed vero delectus
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Perks;