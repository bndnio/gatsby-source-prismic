import * as RTE from 'fp-ts/ReaderTaskEither'
import { constVoid, pipe } from 'fp-ts/function'

import { Dependencies } from '../types'

import { createNodes } from './createNodes'
import { queryDocumentsByIds } from './queryDocumentsByIds'

/**
 * Queries documents in a list of Prismic document IDs from the environment's Prismic
 * repository and creates nodes for each document.
 *
 * @param documentIds List of Prismic document IDs to query and with which to
 * create nodes.
 */
export const sourceNodesForDocumentIds = (
  documentIds: string[],
): RTE.ReaderTaskEither<Dependencies, never, void> =>
  pipe(
    queryDocumentsByIds(documentIds),
    RTE.chain(createNodes),
    RTE.map(constVoid),
  )