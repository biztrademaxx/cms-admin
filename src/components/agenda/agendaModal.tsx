import React from 'react'
import { Modal } from '../ui/modal';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import Button from '../ui/button/Button';

type AgendaMOdalProps ={
  isOpen: boolean;
    closeModal: () => void;
    editingItem:any;
    formik:any; 
}
    
const AgendaModal = ({isOpen,closeModal,editingItem,formik}:AgendaMOdalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <form onSubmit={formik.handleSubmit} className="relative w-full p-4 overflow-y-auto h-[80vh] bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">{editingItem ? "Edit Agenda Item" : "Add Agenda Item"}</h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">Fill out the agenda details below.</p>
          </div>
          <div className="px-2 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <Label>Title</Label>
                <Input type="text" name="title" defaultValue={formik.values.title} onChange={formik.handleChange} />
              </div>
              <div>
                <Label>Speaker</Label>
                <Input type="text" name="speaker" defaultValue={formik.values.speaker} onChange={formik.handleChange} />
              </div>
              <div>
                <Label>Start Time</Label>
                <Input type="time" name="start" defaultValue={formik.values.start} onChange={formik.handleChange} />
              </div>
              <div>
                <Label>End Time</Label>
                <Input type="time" name="end" defaultValue={formik.values.end} onChange={formik.handleChange} />
              </div>
              <div>
                <Label>Tag</Label>
                <select name="tag" value={formik.values.tag} onChange={formik.handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option value="KEYNOTE">KEYNOTE</option>
                  <option value="PRESENTATION">PRESENTATION</option>
                  <option value="QA">QA</option>
                </select>
              </div>
              <div>
                <Label>Date</Label>
                <Input type="date" name="date" defaultValue={formik.values.date} onChange={formik.handleChange} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>Cancel</Button>
            <Button size="sm" type="submit">Save Changes</Button>
          </div>
        </form>
      </Modal>
  )
}

export default AgendaModal