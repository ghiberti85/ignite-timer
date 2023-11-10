import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { createContext, useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns';
import { NewCycleForm } from "./NewCycleForm";
import { Countdown } from "./Countdown";


interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

interface CyclescontextType {
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CyclescontextType);

export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    function markCurrentCycleAsFinished() {
        setCycles( state => state.map(cycle => {
            if(cycle.id === activeCycleId) {
                return {...cycle, finishedDate: new Date() }
            } else {
                return cycle
            }
        }),
        )
    }

    // function handleCreateNewCycle(data: NewCycleFormData) {
    //     const id = String(new Date().getTime());

    //     const newCycle: Cycle = {
    //         id,
    //         task: data.task,
    //         minutesAmount: data.minutesAmount,
    //         startDate: new Date(),
    //     }

    //     setCycles(state => [...state, newCycle]);
    //     setActiveCycleId(id)
    //     setAmountSecondPassed(0)

    //     reset()
    // }

    function handleInterruptCycle() {
        
        setCycles(state =>
            state.map(cycle => {
                if(cycle.id === activeCycleId) {
                    return {...cycle, interruptedDate: new Date() }
                } else {
                    return cycle
                }
            }),
        )
        setActiveCycleId(null)
    }


    // const task = watch('task')
    // const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form /* </HomeContainer>onSubmit={handleSubmit(handleCreateNewCycle)}*/ action="">
                <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}>
                    {/*<NewCycleForm />*/}
                    <Countdown />
                </CyclesContext.Provider>

                { activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton /* disabled={isSubmitDisabled} */ type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                ) }
            </form>
        </HomeContainer>
    )
}