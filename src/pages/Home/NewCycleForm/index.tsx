import { FormContainer, TaskInput, MinutesAmountInput } from './styles';

import { CyclesContext } from '..';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';


export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext);
    const { register } = useFormContext();

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput 
                id="task" 
                list="task-suggestion"
                placeholder="Dê um nome para o seu projeto"
                disabled={!!activeCycle}
                {...register('task')}
            />

            <datalist id="task-suggestion">
                <option value="Projeto 1"></option>
                <option value="Projeto 2"></option>
                <option value="Projeto 3"></option>
                <option value="Projeto 4"></option>
                <option value="Projeto 5"></option>
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput 
                type="number" 
                id="minutesAmount" 
                placeholder="00"
                step={1}
                min={1}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true })}
            />

            <span>minutos.</span>
        </FormContainer>
    )
}