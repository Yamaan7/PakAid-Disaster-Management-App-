import { PayPalButtons } from '@paypal/react-paypal-js';
import { OnApproveData, OnApproveActions, CreateOrderData, CreateOrderActions } from "@paypal/paypal-js";

interface PayPalButtonProps {
    amount: string;
    onSuccess: (details: any) => void;
    onError: (error: any) => void;
}

const PayPalButton = ({ amount, onSuccess, onError }: PayPalButtonProps) => {
    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions) => {
        return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        value: amount,
                        currency_code: "USD"
                    },
                },
            ],
        });
    };

    const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
        try {
            const details = await actions.order?.capture();
            onSuccess(details);
        } catch (error) {
            onError(error);
        }
    };

    return (
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            style={{ layout: "vertical" }}
        />
    );
};

export default PayPalButton;